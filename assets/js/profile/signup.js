// const full_name = document.getElementById("full_name");
// const email = document.getElementById("email");
// const mobile_number = document.getElementById("mobile_number");
// const password = document.getElementById("password");
// const re_enter_password = document.getElementById("re_enter_password");

// function signUp(e) {
//   e.preventDefault();

//   const full_namevalue = full_name.value.trim();
//   const emailvalue = email.value.trim();
//   const mobile_numbervalue = mobile_number.value.trim();
//   const passwordvalue = password.value;
//   const re_enter_passwordvalue = re_enter_password.value;
//   const unique_id = crypto.randomUUID();

//   /// extra details collecting from user
//   const gender = "";
//   const dob = "";
//   const address = "";
//   const hintname = "";

//   full_namespace = /\s/;
//   fullnamepattern = /^[a-zA-Z]+$/;
//   emailpattern =
//     /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//   mobilenumberpattern = /^[1-9]\d{9}$/;

//   if (full_namevalue == "") {
//     setErrorFor(full_name, "Enter your Fullname");
//   }
//   if (full_namespace.test(full_namevalue)) {
//     setErrorFor(full_name, "name must not contain spaces");
//   }
//   if (fullnamepattern.test(full_namevalue)) {
//     setSuccessFor(full_name);
//   }

//   const user_list = JSON.parse(localStorage.getItem("user_list")) || [];
//   console.log(user_list);

//   const exist =
//     user_list.length &&
//     JSON.parse(localStorage.getItem("user_list")).some(
//       (data) =>
//         data.email.toLowerCase() == emailvalue.toLowerCase() &&
//         data.password.toLowerCase() == passwordvalue.toLowerCase()
//     );

//   console.log(exist);

//   if (emailvalue == "") {
//     setErrorFor(email, "enter your email address");
//   } else if (!emailpattern.test(emailvalue)) {
//     setErrorFor(email, "Please enter a valid email address");
//   } else if (exist) {
//     setErrorFor(
//       email,"Sorry the User already Exist!! \n Try with different Email'"
//     );
//   } else {
//     setSuccessFor(email);
//   }

//   if (mobile_numbervalue == "") {
//     setErrorFor(mobile_number, "Enter your mobile number");
//   } else if (!mobilenumberpattern.test(mobile_numbervalue)) {
//     setErrorFor(mobile_number, "Please enter a valid mobilenumber");
//   } else {
//     setSuccessFor(mobile_number);
//   }

//   if (passwordvalue == "") {
//     setErrorFor(password, "Enter the password");
//   } else if (passwordvalue.length < 6) {
//     setErrorFor(password, "password must contain at least 6 characters");
//   } else {
//     setSuccessFor(password);
//   }

//   if (re_enter_passwordvalue == "") {
//     setErrorFor(re_enter_password, "Enter the password");
//   }
//   if (re_enter_passwordvalue !== passwordvalue) {
//     setErrorFor(re_enter_password, "password must be the same");
//   }
//   if (re_enter_passwordvalue == passwordvalue) {
//     setSuccessFor(re_enter_password);
//   }

//   function setErrorFor(input, message) {
//     const formcontrol = input.parentElement;
//     console.log(formcontrol);
//     const small_msg = formcontrol.querySelector("small");
//     console.log(small_msg);

//     small_msg.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;

//     formcontrol.className = "form-control error";
//   }

//   function setSuccessFor(input, message) {
//     const formcontrol = input.parentElement;
//     const small_msg = formcontrol.querySelector("small");
//     console.log(small_msg);

//     small_msg.innerHTML = "";
//     formcontrol.className = "form-control success";
//   }

//   if (
//     full_namevalue !== "" &&
//     !full_namespace.test(full_namevalue) &&
//     fullnamepattern.test(full_namevalue) &&
//     emailpattern.test(emailvalue) &&
//     emailvalue !== "" &&
//     !exist &&
//     mobile_numbervalue !== "" &&
//     mobilenumberpattern.test(mobile_numbervalue) &&
//     passwordvalue !== "" &&
//     re_enter_passwordvalue !== "" &&
//     re_enter_passwordvalue == passwordvalue
//   ) {
//     user_list.push({
//       full_name: full_namevalue,
//       email: emailvalue,
//       mobile_number: mobile_numbervalue,
//       password: passwordvalue,
//       re_enter_password: re_enter_passwordvalue,
//       gender,
//       dob,
//       hintname,
//       unique_id,
//     });

//     localStorage.setItem("user_list", JSON.stringify(user_list));
//     document.querySelector("form").reset();
//     alert("Account created Successfully");

//     document.querySelector("form").reset();

//     location.href = "./login.html";
//   }
// }

// console.log(document.querySelectorAll(".form-control.success"));

// function signIn(e) {
//   e.preventDefault();

//   const email = document.getElementById("email").value;
//   console.log(email);
//   const password = document.getElementById("password").value;
//   console.log(password);
//   const user_list = JSON.parse(localStorage.getItem("user_list")) || [];
//   const exist =
//     user_list.length &&
//     JSON.parse(localStorage.getItem("user_list")).some(
//       (data) =>
//         data.email.toLowerCase() == email.toLowerCase() &&
//         data.password.toLowerCase() == password.toLowerCase()
//     );

//   console.log(exist);

//   if (exist) {
//     // console.log(user_detail);
//     localStorage.setItem("unique_id", JSON.stringify(email));

//     console.log("user_detail");
//     alert("Login successfully");
//     location.href = "./account.html";
//   }

//   if (!exist) {
//     alert("Incorrect login credentials");
//   }
// }
// function signUp(e) {
//   e.preventDefault();

//   const full_name = document.getElementById("full_name").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const mobile_number = document.getElementById("mobile_number").value.trim();
//   const password = document.getElementById("password").value.trim();

//   const user = {
//       full_name: full_name,
//       email: email,
//       mobile_number: mobile_number,
//       password: password
//   };
// console.log(user);
//   fetch('/signup', {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(user)
//   })
//   .then(response => {
//       if (!response.ok) {
//           throw new Error('Network response was not ok');
//       }
//       return response.json();
//   })
//   .then(data => {
//       if (data.success) {
//           alert('User signed up successfully!');
//           window.location.href = '/login.html'; 
//       } else {
//           alert('Error: ' + data.error);
//       }
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });
// }

// document.getElementById("signupForm").addEventListener("submit", signUp);
