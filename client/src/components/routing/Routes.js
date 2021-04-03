import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Register from '../auth/Register'
import Login from '../auth/Login'
import Alert from '../layout/Alert'
import Dashboard from '../dashboard/Dashboard'
import PrivateRoute from '../routing/PrivateRoute'
import Createprofile from '../layout/profile-forms/Createprofile'
import Editprofile from '../layout/profile-forms/Editprofile'
import AddExperience from '../layout/profile-forms/AddExperience'
import AddEducation from '../layout/profile-forms/AddEducation'
import Profiles from '../profiles/Profiles'
import Profile from '../profile/Profile'
import Posts from '../posts/Posts'
import Post from '../post/Post'
import Notfound from '../layout/Notfound'

export const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/profiles' component={Profiles} />
        <Route exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={Createprofile} />
        <PrivateRoute exact path='/edit-profile' component={Editprofile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={Notfound} />
      </Switch>
    </section>
  )
}
