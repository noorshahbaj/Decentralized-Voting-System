const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const voter_id = document.getElementById("voter-id").value;
  const voter_nid = document.getElementById("voter-nid").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");
  const token = voter_id;

  const headers = {
    method: "GET",
    Authorization: `Bearer ${token}`,
  };

  fetch(
    `http://127.0.0.1:8000/login?voter_id=${voter_id}&voter_nid=${voter_nid}&password=${password}`,
    { headers }
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        error.style.display = "block";
        throw new Error("Login failed");
      }
    })
    .then((data) => {
      if (data.role === "admin") {
        console.log(data.role);
        localStorage.setItem("jwtTokenAdmin", data.token);
        window.location.replace(
          `http://127.0.0.1:8080/admin.html?Authorization=Bearer ${localStorage.getItem(
            "jwtTokenAdmin"
          )}`
        );
      } else if (data.role === "user") {
        localStorage.setItem("jwtTokenVoter", data.token);
        window.location.replace(
          `http://127.0.0.1:8080/index.html?Authorization=Bearer ${localStorage.getItem(
            "jwtTokenVoter"
          )}`
        );
      }
    })
    .catch((error) => {
      console.error("Login failed:", error.message);
    });
});
