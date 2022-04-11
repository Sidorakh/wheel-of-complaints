import data from './raw-data.json';
import {analytics} from './firebase';
import axios from 'axios';

const enabled = !window.location.href.includes('localhost');

const client = axios.create();

function item_to_index(item,type) {
    return data[type].findIndex(v=>v==item);
}

async function record_item(item,type) {
    if (!enabled) return;
    const index = item_to_index(item,type);
    //await client.post(`/api/item/${type}/${index}`);
    analytics.logEvent(`record_${type}`,{index});
}

async function header_clicked() {
    if (!enabled) return;
    //await client.post(`/api/header-clicked`);
    analytics.logEvent(`header_clicked`);
}

async function record_share(type) {
    if (!enabled) return;
    //await client.post(`/share/${type}`);
    analytics.logEvent(`shared`,{type});

}

export default {
    record_item,
    record_share,
    header_clicked,
}