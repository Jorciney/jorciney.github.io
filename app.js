---
layout: compress
# PWA app file
---

{% assign cache_list = site.static_files | where: 'swcache', true %}
{% for file in cache_list %}
  {%- unless file.path contains '/js/' -%}
    {%- continue -%}
  {%- endunless -%}
  importScripts('{{ file.path | relative_url }}');
{% endfor %}

const $notification = $('#notification');
const $btnRefresh = $('#notification .toast-body>button');

if ('serviceWorker' in navigator) {
    /* Registering Service Worker */
    navigator.serviceWorker.register('{{ '/sw.js' | relative_url }}')
        .then(registration => {

            /* in case the user ignores the notification */
            if (registration.waiting) {
                $notification.toast('show');
            }

            registration.addEventListener('updatefound', () => {
                registration.installing.addEventListener('statechange', () => {
                    if (registration.waiting) {
                        if (navigator.serviceWorker.controller) {
                            $notification.toast('show');
                        }
                    }
                });
            });

            $btnRefresh.click(() => {
                if (registration.waiting) {
                    registration.waiting.postMessage('SKIP_WAITING');
                }
                $notification.toast('hide');
            });
        });

    let refreshing = false;

    /* Detect controller change and refresh all the opened tabs */
    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!refreshing) {
            window.location.reload();
            refreshing = true;
        }
    });
}