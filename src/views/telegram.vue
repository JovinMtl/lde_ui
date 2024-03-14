<template>
    <div ref="telegramLogin"></div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  
  export default {
    setup() {
      const telegramLogin = ref(null);
  
      onMounted(() => {
        const telegramScript = document.createElement('script');
        telegramScript.src = 'https://telegram.org/js/telegram-widget.js?22';
        telegramScript.setAttribute('data-telegram-login', 'lid111bot');
        telegramScript.setAttribute('data-size', 'large');
        telegramScript.setAttribute('data-request-access', 'write');
        document.head.appendChild(telegramScript);
  
        window.onTelegramAuth = function(user) {
          alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');
        };
  
        telegramLogin.value.appendChild(telegramScript);
      });
  
      return { telegramLogin };
    },
  };
  </script>
  