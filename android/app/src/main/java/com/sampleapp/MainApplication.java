package com.sampleapp;

import android.app.Application;
import android.content.Context;
import com.facebook.react.PackageList;
import com.facebook.react.ReactApplication;


import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.soloader.SoLoader;
import java.lang.reflect.InvocationTargetException;
import java.util.List;
import com.microsoft.codepush.react.CodePush;
import com.razorpay.rn.RazorpayPackage;
import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.os.Build;
import android.media.AudioAttributes;
import android.net.Uri;
import android.content.ContentResolver;
import androidx.core.app.NotificationCompat;

// Video Call Settings
import live.videosdk.rnfgservice.ForegroundServicePackage;
import live.videosdk.rnincallmanager.InCallManagerPackage;
import live.videosdk.rnwebrtc.WebRTCModulePackage;




public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost =
      new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
          return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
          @SuppressWarnings("UnnecessaryLocalVariable")
          List<ReactPackage> packages = new PackageList(this).getPackages();
          // Packages that cannot be autolinked yet can be added manually here, for example:
          // packages.add(new MyReactNativePackage());
          new RazorpayPackage();

          packages.add(new ForegroundServicePackage());
          packages.add(new InCallManagerPackage());
          packages.add(new WebRTCModulePackage());
          return packages;
        }

        @Override
        protected String getJSMainModuleName() {
          return "index";
        }

         @Override
        protected String getJSBundleFile() {
            return CodePush.getJSBundleFile();
        }
      };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  

  


  @Override
  public void onCreate() {
    super.onCreate();
    createNotificationChannel();
    SoLoader.init(this, /* native exopackage */ false);
    initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
  }


  private void createNotificationChannel() {
    // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    //   NotificationChannel channel = new NotificationChannel(
    //     "812019205023-9994365901", // Replace with the same channel ID used in React Native
    //     "com.sampleapp.app", // Replace with the same channel name used in React Native
    //     NotificationManager.IMPORTANCE_HIGH
    //   );

    //   NotificationManager notificationManager = getSystemService(NotificationManager.class);
    //   notificationManager.createNotificationChannel(channel);
    // }

    // if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
    //       NotificationChannel notificationChannel = new NotificationChannel("812019205023-9994365901", "com.sampleapp.app", NotificationManager.IMPORTANCE_HIGH);
    //       notificationChannel.setShowBadge(true);
    //       notificationChannel.setDescription("");
    //       AudioAttributes att = new AudioAttributes.Builder()
    //               .setUsage(AudioAttributes.USAGE_NOTIFICATION)
    //               .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
    //               .build();
    //       notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/notification"), att);
    //       notificationChannel.enableVibration(true);
    //       notificationChannel.setVibrationPattern(new long[]{400, 400});
    //       notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
    //       NotificationManager manager = getSystemService(NotificationManager.class);
    //       manager.createNotificationChannel(notificationChannel);
    //   }
  }

  /**
   * Loads Flipper in React Native templates. Call this in the onCreate method with something like
   * initializeFlipper(this, getReactNativeHost().getReactInstanceManager());
   *
   * @param context
   * @param reactInstanceManager
   */
  private static void initializeFlipper(
      Context context, ReactInstanceManager reactInstanceManager) {
    if (BuildConfig.DEBUG) {
      try {
        /*
         We use reflection here to pick up the class that initializes Flipper,
        since Flipper library is not available in release mode
        */
        Class<?> aClass = Class.forName("com.sampleapp.ReactNativeFlipper");
        aClass
            .getMethod("initializeFlipper", Context.class, ReactInstanceManager.class)
            .invoke(null, context, reactInstanceManager);
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      } catch (NoSuchMethodException e) {
        e.printStackTrace();
      } catch (IllegalAccessException e) {
        e.printStackTrace();
      } catch (InvocationTargetException e) {
        e.printStackTrace();
      }
    }
  }
}


