import {Meteor} from "meteor/meteor";
import {TAPi18n} from "meteor/tap:i18n";
import {Momentum} from "meteor/percolate:momentum";
import {moment} from "meteor/momentjs:moment";
import "./routes.js";

Meteor.startup(function () {

    const locale = window.navigator.userLanguage ||
    window.navigator.language ||
    window.navigator.systemLanguage;

    TAPi18n.setLanguage(locale);
    moment.locale(locale);

    Momentum.registerPlugin('instaRemoveFadeIn', function () {
        return {
            insertElement: function (node, next) {
                const $node = $(node);
                $node.hide()
                    .insertBefore(next)
                    .velocity('fadeIn');
            },
            moveElement: function (node, next) {
                this.insertElement(node, next);
            },
            removeElement: function (node) {
                const $node = $(node);
                $node.remove();
            }
        };
    });
});