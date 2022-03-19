let app_bar = '#1976d2';
let wheel_1 = '#cc001b'
let wheel_2 = '#388d16'
let wheel_3 = '#0a2463';

let app_bar_listener = null;

function set_app_bar(nc) {
    app_bar = nc;
    if (app_bar_listener) app_bar_listener(nc);
}
function get_app_bar() {
    return app_bar;
}
function set_wheel_1(nc) {
    wheel_1 = nc;
}
function get_wheel_1() {
    return wheel_1;
}
function set_wheel_2(nc) {
    wheel_2 = nc;
}
function get_wheel_2() {
    return wheel_2;
}
function set_wheel_3(nc) {
    wheel_3 = nc;
}
function get_wheel_3() {
    return wheel_3;
}
function set_app_bar_listener(listener) {
    app_bar_listener = listener;
}
export {
    set_app_bar,
    get_app_bar,
    get_wheel_1,
    set_wheel_1,
    get_wheel_2,
    set_wheel_2,
    get_wheel_3,
    set_wheel_3,
    set_app_bar_listener,
};