let coursecollection;
let numplayers = 5;
let numholes = 18;

(function(){
    loadDoc();
})();

function loadDoc() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            mycourses = JSON.parse(this.responseText);
            console.log(mycourses);

            for(let i = 0; i < mycourses.courses.length; i++) {
                $('.courses').append(`<option value="${mycourses.courses[i].id}"> ${mycourses.courses[i].name}</option>`);
            }
        }
    }
    http.open("GET", "http://golf-courses-api.herokuapp.com/courses", true);
    http.send();
}

function loadCourse(courseId) {
    console.log(courseId);
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            mycourse = JSON.parse(this.responseText);
            console.log(mycourse);

            let teeArray = mycourse
        }
    }
    http.open("GET", `http://golf-courses-api.herokuapp.com/courses/${courseId}`, true);
    http.send();
}

function chooseTee() {

}