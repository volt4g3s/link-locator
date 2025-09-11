// Import library Firebase khusus untuk Service Worker
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js");

// === Config Firebase (sama persis dengan project lo) ===
firebase.initializeApp({
    apiKey: "AIzaSyAtTaKf_Psb-yhxa5nNFIcs3Tte5gjYe00",
    authDomain: "locked-1dfad.firebaseapp.com",
    projectId: "locked-1dfad",
    storageBucket: "locked-1dfad.firebasestorage.app",
    messagingSenderId: "237366240355",
    appId: "1:237366240355:web:e3a4f999ff547a07398456"
});

// === Ambil instance messaging ===
const messaging = firebase.messaging();

// === Template notif random (judul-body berpasangan) ===
const notifTemplates = [
    { title: "🔔 Notifikasi Baru", body: "Klik untuk melihat informasi." },
    { title: "⚡ Sistem Update", body: "Update berhasil dijalankan." },
    { title: "📢 Info Penting", body: "Silakan buka untuk melanjutkan." },
    { title: "🔄 Sinkronisasi Data", body: "Sinkronisasi data berhasil." },
    { title: "✅ Proses Berhasil", body: "Proses telah selesai dengan sukses." }
];
function pickRandomTemplate() {
    return notifTemplates[Math.floor(Math.random() * notifTemplates.length)];
}

// === Handler pesan background dari FCM ===
messaging.onBackgroundMessage((payload) => {
    console.log("Pesan background:", payload);
    
    // Pilih template random kalau payload gak ada title/body
    const template = pickRandomTemplate();
    const title = payload.notification?.title || template.title;
    const body  = payload.notification?.body  || template.body;
    
    self.registration.showNotification(title, {
        body,
        data: { url: payload.data?.url || "/" }
    });
});

// === Kalau notif diklik ===
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url || "/"));
});