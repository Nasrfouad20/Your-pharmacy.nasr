const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const formTitle = document.getElementById('form-title');
const forgotPassword = document.getElementById('forgot-password');

let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

// تبديل بين تسجيل الدخول وإنشاء حساب
switchToSignup.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  formTitle.innerText = 'إنشاء حساب';
});

switchToLogin.addEventListener('click', () => {
  signupForm.style.display = 'none';
  loginForm.style.display = 'block';
  formTitle.innerText = 'تسجيل الدخول';
});

// إنشاء حساب
signupForm.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('signup-name').value;
  const phone = document.getElementById('signup-phone').value;
  const password = document.getElementById('signup-password').value;

  if(users.find(u => u.phone === phone)) {
    alert('رقم الهاتف موجود بالفعل!');
    return;
  }

  const newUser = { name, phone, password, cart: [] };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  alert(`تم إنشاء الحساب بنجاح، مرحبًا ${name}!`);
  signupForm.reset();
  switchToLogin.click();
});

// تسجيل الدخول
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const phone = document.getElementById('login-phone').value;
  const password = document.getElementById('login-password').value;

  const user = users.find(u => u.phone === phone && u.password === password);
  if(!user) {
    alert('رقم الهاتف أو كلمة المرور غير صحيحة!');
    return;
  }

  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
  alert(`مرحبًا ${user.name}, تم تسجيل الدخول!`);

  // بعد تسجيل الدخول نقدر نقل المستخدم للسلة مثلاً
  window.location.href = 'cart.html';
});

// نسيت كلمة المرور
forgotPassword.addEventListener('click', () => {
  const phone = prompt('ادخل رقم هاتفك لاستعادة كلمة المرور:');
  const user = users.find(u => u.phone === phone);
  if(!user) {
    alert('رقم الهاتف غير موجود!');
    return;
  }
  alert(`كلمة مرورك هي: ${user.password}`);
});
