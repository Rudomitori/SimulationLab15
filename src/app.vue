<template>
  <main class="tile is-ancestor is-vertical m-0 column is-half-desktop">
    <div class="tile is-parent" v-if="!IsStarted">
      <div class="tile is-child field has-addons box">
        <div class="control">
          <span class="is-bold button is-static">
            Начать симуляцию c:
          </span>
        </div>
        <div class="control">
          <button class="button is-primary" @click="start(0)">
            Ясно
          </button>
        </div>
        <div class="control">
          <button class="button is-primary" @click="start(1)">
            Облачно
          </button>
        </div>
        <div class="control">
          <button class="button is-primary" @click="start(2)">
            Пасмурно
          </button>
        </div>
      </div>
    </div>

    <div class="tile is-parent" v-if="IsStarted">
      <div class="tile is-child panel">
        <p class="panel-heading">
          Прогноз погоды на завтра
        </p>
        <div class="panel-block">
          <table class="table container">
            <thead>
            <tr>
              <th>Солнечно</th>
              <th>Облачно</th>
              <th>Пасмурно</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ format(forecast[0] * 100) }}%</td>
              <td>{{ format(forecast[1] * 100) }}%</td>
              <td>{{ format(forecast[2] * 100) }}%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="tile is-parent" v-if="IsStarted">
      <div class="tile is-child panel">
        <p class="panel-heading">
          Вероятности погод
        </p>
        <div class="panel-block">
          <table class="table container">
            <thead>
            <tr>
              <th>Солнечно</th>
              <th>Облачно</th>
              <th>Пасмурно</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td>{{ format(durations[0] * 100 / durations.reduce((a, b) => a + b, 0)) }}%</td>
              <td>{{ format(durations[1] * 100 / durations.reduce((a, b) => a + b, 0)) }}%</td>
              <td>{{ format(durations[2] * 100 / durations.reduce((a, b) => a + b, 0)) }}%</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="tile is-parent" v-if="IsStarted">
      <div class="tile is-child panel is-link">
        <p class="panel-heading">
          Лог изменений пагоды
        </p>
        <div class="panel-block" v-for="log of logs">
          {{ log }}
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import Vue from "vue"
import {getNextState} from "./domain/Markov";
import {processe} from "./domain/StatisticalProcessing";

export default Vue.extend({
  data() {
    return {
      logs: [] as string [],
      IsStarted: false,
      durations: [0.0001, 0.0001, 0.0001],
      forecast: [] as number[],
      dur: 0,
      state: 0,
      nextState: 0,
      daysPerSecond: 0.5,
      dateTime: new Date(Date.now()),
      names: ["Солнечно", "Облачно", "Пасмурно"],
      fg: 0,
    }
  },

  methods: {
    format: new Intl.NumberFormat("ru-RU", {
      maximumFractionDigits: 2
    }).format,

    start(state: number) {
      this.logs.push(`Начальная погода: ${this.names[state]}`)
      this.IsStarted = true
      this.forecast = processe(100, 1, state, getNextState)
      this.state = state;
      [this.nextState, this.dur] = getNextState(state)
      setTimeout(() => this.doStep(), this.dur / this.daysPerSecond * 1000)
    },

    doStep() {
      console.log(this.fg++)
      console.log(this.dur)
      this.dateTime.setTime(this.dateTime.getTime() + this.dur * 1000 * 3600 * 24)
      this.logs.push(`${this.names[this.state]} сменилось на ${this.names[this.nextState]} в ${this.dateTime.toLocaleString("ru-RU")}`)

      this.durations[this.state] += this.dur
      this.state = this.nextState;
      this.forecast = processe(100, 1, this.state, getNextState);
      [this.nextState, this.dur] = getNextState(this.state)
      setTimeout(() => this.doStep(), this.dur / this.daysPerSecond * 1000)
    }
  }
});
</script>