import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

//layouts
import '../../ui/layouts/app-body';

//pages
import '../../ui/pages/home/home';

FlowRouter.route('/', {
    name: 'home',
    action: () => BlazeLayout.render('App_body', {content: 'home'})
});