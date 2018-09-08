const moment = require('moment');

let formatDate = (date, format) => {
    return moment(date).format(format); 
}

let getUserFirstName = () => {    
    let user = global.user;
    return user.firstName
};

let getUserSection = () => {
    let user = global.user;
    if(user.firstName != ''){
        return '{{ > user_section }}'
    }
}

let editView = (ownerID) => {
    let userID = String(global.user._id).trim();
    ownerID = String(ownerID).trim();
    var isOwner = userID == ownerID;
    var isAdmin = global.user.type == 'admin';
    if(isAdmin || isOwner){
        return 'edit_view';
    }else {
        return 'nothing';
    } 
}

let checkIfOwner = (ownerID, viewIfSo, viewIfNot) => {
    let userID = String(global.user._id).trim();
    if(ownerID == userID){
        return String(viewIfSo);
    } else {
        return String(viewIfNot);
    } 
}

let checkIfAdmin = (viewIfSo, viewIfNot) => {
    console.log(viewIfNot);
    console.log(viewIfSo)
    if(global.user.type == 'admin'){
        return String(viewIfSo);
    } else {
        return String(viewIfNot);
    } 
}

let menuView = () => {
    if(global.user.type == 'admin'){
        return 'admin_menu';
    } else if(global.user.firstName == ''){
        return 'nothing';
    } else {
        return 'user_menu';
    }
}

module.exports = {
    formatDate,
    getUserFirstName,
    getUserSection,
    editView,
    checkIfAdmin,
    checkIfOwner,
    menuView
}