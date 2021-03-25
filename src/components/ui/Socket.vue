<template>

</template>

<script>

export default {
  sockets: {
    kick_players(data) {
      console.log(data)
    },
    kick_one_player(data) {
      console.log(data)
    },
    player_logout(data) {
      console.log(data)
    },
    player_message(data) {
      console.log(data)
    }
  },
}
</script>