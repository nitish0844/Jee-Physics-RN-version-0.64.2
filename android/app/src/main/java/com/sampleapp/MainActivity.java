package com.sampleapp;
import android.os.Bundle; // here
// import org.devio.rn.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.ContentResolver;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;

import androidx.core.app.NotificationCompat;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */

@Override
  protected void onCreate(Bundle savedInstanceState) {
      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          NotificationChannel notificationChannel = new NotificationChannel("812019205023-9994365901", "com.sampleapp.app", NotificationManager.IMPORTANCE_HIGH);
          notificationChannel.setShowBadge(true);
          notificationChannel.setDescription("");
          AudioAttributes att = new AudioAttributes.Builder()
                  .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                  .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                  .build();
          notificationChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/notification"), att);
          notificationChannel.enableVibration(true);
          notificationChannel.setVibrationPattern(new long[]{400, 400});
          notificationChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
          NotificationManager manager = getSystemService(NotificationManager.class);
          manager.createNotificationChannel(notificationChannel);
      }

      // SplashScreen.show(this);
      super.onCreate(savedInstanceState);
  }

  @Override
  protected String getMainComponentName() {
    return "sampleapp";
  }

  //  @Override
  //   protected void onCreate(Bundle savedInstanceState) {
  //       SplashScreen.show(this);  // here
  //       super.onCreate(savedInstanceState);
  //   }
}
