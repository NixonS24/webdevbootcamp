Base Routing Methodology

Name    Path            HTTP Verb   Purpose                                 Mongoose                                       
    
Index   /dogs           GET         List all dogs                           Database.find()
New     /dogs/new       GET         Show new dog form                       N/A
Create  /dogs           POST        Create a new dog, then redirect         Database.create()
Show    /dogs/:id       GET         Show info about a specific dog          Database.findById()
Edit    /dogs/:id/edit  GET         Show edit from for one dog              Database.findById()
Update  /dogs/:id       PUT         Update particular dog, then redirect    Database.findByIdAndUpdate
Destroy /dogs/:id       DELETE      Delete a particular dog, then redirect  Database.findByIdAndRemove()