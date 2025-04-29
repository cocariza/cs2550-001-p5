/*
Project:  Project 5 – Visitor Form Validation
Name: Christopher Ocariza
Submitted: April 29, 2025

I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student, 
or leaving my code on a public web site constitutes cheating.
I acknowledge that if I am found in violation of this policy this may result
in a zero grade, a permanent record on file, and possibly immediate failure of 
the class.

Reflection:
This project strengthened my understanding of JavaScript form validation 
through regex and logical checks. I discovered how to structure JS into modular 
files and utilize Flexbox for form layout. Initially, styling responsively 
posed some challenges, but it became much neater once I grasped Flexbox.
*/

function toggleForm() {
    const section = document.getElementById("form-section");
    section.style.display = (section.style.display === "none") ? "block" : "none";
  }