import data from './raw-data.json';
import axios from 'axios';

const enabled = !window.location.href.includes('localhost');

const client = axios.create({baseURL: 'https://sidorakh.net/political-spin'});

function item_to_index(item,type) {
    return data[type].findIndex(v=>v==item);
}

async function record_item(item,type) {
    if (!enabled) return;
    const index = item_to_index(item,type);
    await client.post(`/item/${type}/${index}`);
}

async function header_clicked() {
    if (!enabled) return;
    await client.post(`/header-clicked`);
}

async function record_share(type) {
    if (!enabled) return;
    await client.post(`/share/${type}`);

}

(async()=>{
    if (!enabled) return;
    if (window.localStorage.getItem('last_opened') == null) {
        await client.post(`/hits/unique`);
        window.localStorage.setItem('last_opened',Date.now());
    } else {
        await client.post(`/hits/all`);
    }
})();

export default {
    record_item,
    record_share,
    header_clicked,
}