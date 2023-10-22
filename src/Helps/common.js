const showToast = (message) => {
ToastAndroid.showWithGravityAndOffset(
    message,
    ToastAndroid.LONG, // Toast duration (can also use SHORT)
    ToastAndroid.BOTTOM, // Toast position (can also use TOP or CENTER)
    25, // X offset
    50 // Y offset
);
};