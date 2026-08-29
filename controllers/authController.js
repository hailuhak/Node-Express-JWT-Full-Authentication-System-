export const signup_get = (req, res) => {
    res.render("signup");
};
export const login_get = (req, res) => {
    res.render("login");
};
export const signup_post = (req, res) => {
 const { email, password } = req.body;
 console.log(email, password )
    res.send("Signup received");
};
export const login_post = (req, res) => {
     console.log(req.body);

    res.send("Signup")
};