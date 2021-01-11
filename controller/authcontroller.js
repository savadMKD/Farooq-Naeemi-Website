module.exports = {
    admin_login: (login_data) => {
        return new Promise((resolve, reject) => {
            if(login_data.email == "admin@gmail.com" && login_data.password == "admin"){
                resolve({ status: true });
            }
            else {
                reject({ status: false });
            }
        });
    }
}