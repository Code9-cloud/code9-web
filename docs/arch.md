# Components

Navbar  
SidePanel  
Editor,
* File memory, offset & zoom & unsaved edits (per browser session)

There is a top level element that represents Organisation wide details.
Within Org, there are applications
Within Application, there are services.
Within Application, there are Entities, Methods.

Top level states
User
    status: loggedIn | loggedOut
    name
    avatar
Organisation
    status: active | inactive | onboarding_pending
CodeBase
    status: loading | loaded


Keep Entity & Methods In global context under application
Selected Entity Id
IsEditing Entity Sidebar
IsEntitySidebarOpen

Create a loading screen while app is being loaded in frontend.

Tasks
1. Entity Sidebar
2. Create Entity Flow
3. Edit Entity Flow