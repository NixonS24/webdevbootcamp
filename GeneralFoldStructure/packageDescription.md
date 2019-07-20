General Base Packages
    express     - routing framework that gives you a layer of functionality between node.js & HTTP server
    body-parser - middelware that parse incoming request into req.body
    ejs         - help us control javascript in our front-end tempates

Authentication, (with MongodDB)
    express                 - as above
    mongoose                - as above
    passport                - authentication middleware for node.js 
    passport-local          - stragety for authenticating with username and password
    passport-local-mongoose - gives a laywer of functionality over our passport-local stragety
    express-session         - Lets us control and log user states in broswer
    body-parser             - as above
    mongoose                - layer of fuctionality over MongoDB (validation, casting and business logic)
    

Update and Destroy Routes
    method-override - enables us to use "Put" and "Delete" which is not otherwise supported
