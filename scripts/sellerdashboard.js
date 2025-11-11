import { getDataFromDB } from "./utils.js";
import {
    onAuthStateChanged,
    signOut,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { auth } from "./firebaseconfig.js";

const companyName = document.getElementById("company-name")
const companyNameInitials = document.getElementById("company-name-initials")
const logoutBtn = document.getElementById("logout-btn")

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;

        const userInfo = await getDataFromDB(uid, "users");
        
        const compName =  userInfo[0].companyName

        if (userInfo[0].profile == '') {
            const compNameInitials = compName.split(" ").slice(0, 2).map(word => word[0]).join('')
            companyNameInitials.textContent = compNameInitials
        } else {
            const profileImage = document.createElement("img")
            profileImage.classList.add("rounded-full", "h-10", "w-10", "object-cover")
            profileImage.src = userInfo[0].profile
            fullNameInitials.appendChild(profileImage)
        }

        companyName.textContent = compName

    } else {
        window.location = "../pages/signin.html"
    }
});

logoutBtn.addEventListener("click", () => {
    signOut(auth)
    .then(() => {
        window.location = "../pages/signin.html";
    })
    .catch((error) => {
        console("error occured", error);
    });
});