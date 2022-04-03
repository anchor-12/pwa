const sCacheName = 'hello-pwa';
const aFilesToCache = [
    '/03/',
    '/03/index.html',
    '/03/manifest.json',
    '/03/images/hello-pwa.png',
    '/03/images/icons/favicon.ico',
];

self.addEventListener('install', pEvent => {
    console.log('서비스 워커 설치함!');
    pEvent.waitUntil(
        caches.open(sCacheName)
        .then(pCach => {
            console.log('파일을 캐시에 저장함!');
            return pCach.addAll(aFilesToCache);
        })
    )
});

self.addEventListener('activate', pEvent => {
    console.log('서비스 워커 동작 시작됨!');
});

self.addEventListener('fetch', pEvent => {
    pEvent.respondWith(
        caches.match(pEvent.request)
        .then(response => {
            if (!response) {
                console.log('네트워크에서 데이터 요청!', pEvent.request);
                return fetch(pEvent.request);
            }

            console.log('캐시에서 데이터 요청!', pEvent.request);
            return response;
        }).catch(err => console.log(err))
    )
});