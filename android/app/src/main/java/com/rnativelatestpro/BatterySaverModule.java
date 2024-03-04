package com.rnativelatestpro;

import android.content.Context;
import android.os.Build;
import android.os.PowerManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Promise;

public class BatterySaverModule extends ReactContextBaseJavaModule {

    private final ReactApplicationContext reactContext;

    public BatterySaverModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() {
        return "BatterySaverModule";
    }

    @ReactMethod
    public void isBatterySaverModeEnabled(Promise promise) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            PowerManager powerManager = (PowerManager) reactContext.getSystemService(Context.POWER_SERVICE);
            if (powerManager != null) {
                boolean isBatterySaverMode = powerManager.isPowerSaveMode();
                promise.resolve(isBatterySaverMode);
            } else {
                promise.reject("POWER_SERVICE_UNAVAILABLE", "Power service is unavailable");
            }
        } else {
            promise.reject("UNSUPPORTED_SDK_VERSION", "Battery saver mode is only available for Lollipop (API 21) and above");
        }
    }
}