import {Meteor} from "meteor/meteor";
import {TAPi18n} from "meteor/tap:i18n";
import {moment} from "meteor/momentjs:moment";
import '../client/accounts-config'
import "./routes.js";

Meteor.startup(function () {

    const locale = window.navigator.userLanguage ||
    window.navigator.language ||
    window.navigator.systemLanguage;

    TAPi18n.setLanguage(locale);
    moment.locale(locale);
});