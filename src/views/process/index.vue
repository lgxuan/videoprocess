<template>
  <div style="display: flex">
    <div style="flex: 1"></div>
    <div style="flex: 4">
      <el-card style="width: 100%">
        <div class="card" style="width: 100%">
          <center>
            <div id="beforeVideo" :v-if="data.videoPlayerDialog" />
          </center>

          <el-button
            type="primary"
            @click="openVideo"
            style="width: 100%; margin-top: 10px"
            plain
            >查看原视频</el-button
          >
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.rate_ck"
                  label="倍数"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-slider
                  v-model="data.rate"
                  :format-tooltip="formatTooltip"
                  :min="1"
                  :max="100"
                />
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.brightness_ck"
                  label="亮度"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-slider
                  v-model="data.brightness"
                  :format-tooltip="formatTooltip"
                  :min="-1000"
                  :max="1000"
                />
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.contrast_ck"
                  label="对比度"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-slider
                  v-model="data.contrast"
                  :format-tooltip="formatTooltip"
                  :min="5"
                  :max="50"
                />
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.gray_ck"
                  label="灰度"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-slider
                  v-model="data.gray"
                  :format-tooltip="formatTooltip"
                  :min="-100"
                  :max="100"
                />
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.whitening_ck"
                  label="美白"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-slider v-model="data.whitening" :min="0" :max="100" />
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.exfoliating_ck"
                  label="磨皮"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-slider v-model="data.exfoliating" :min="0" :max="100" />
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.style_ck"
                  label="风格"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-select v-model="data.style">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div class="item">
            <el-row type="flex" :gutter="20">
              <el-col :span="3" class="left-align">
                <el-checkbox
                  v-model="data.bubble_ck"
                  label="泡泡"
                  name="type"
                ></el-checkbox>
              </el-col>
              <el-col :span="21">
                <el-select v-model="data.bubble">
                  <el-option
                    v-for="item in options_bubble"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-col>
            </el-row>
          </div>
          <div style="display: block; width: 100%">
            <el-button
              type="primary"
              @click="transData()"
              style="width: 100%; margin-top: 10px"
              plain
              >提交处理</el-button
            >
            处理文件名称:{{ data.fileName }}
            <!-- <el-button type="danger" plain @click="handleCheck()" :loading="data.isSending" style="width: 100%;margin-top:10px;translate:-12px;">进度查询</el-button> -->
          </div>
          <center>
            <el-progress
              :percentage="data.progress_num"
              v-if="data.progress_num >= 0"
              :status="data.progress_num >= 100 ? 'success' : ''"
            />
          </center>

          <center>
            <div id="afterVideo" v-if="data.progress_num >= 0" />
          </center>
        </div>
      </el-card>
    </div>

    <div style="flex: 1"></div>
  </div>
</template>

<script setup>
import { reactive, nextTick } from "vue";
import {
  ElSlider,
  ElRow,
  ElCol,
  ElCheckbox,
  ElCard,
  ElOption,
  ElButton,
  ElMessage
} from "element-plus";
import { fileBaseUri } from "../../api/utils";
import { setres, prores } from "../../api/process";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

const openVideo = async () => {
  data.videoPlayerDialog = true;
  await nextTick();
  new Player({
    id: "beforeVideo",
    url: fileBaseUri + "1.mp4",
    lang: "zh",
    // 默认静音
    volume: 0,
    autoplay: false,
    error: "等待视频加载"
  });
};

const checkProgress = () => {
  let submitData = {
    data: [
      {
        src: "1.mp4",
        dst: data.fileName
      }
    ]
  };
  prores(submitData)
    .then(function (response) {
      data.progress_num = response["data"][0]["result"];
    })
    .catch(function (error) {
      ElMessage({
        message: "链接服务器异常！",
        type: "warning"
      });
    });
};
let refreshProgress = null;
const refp = () => {
  refreshProgress = setInterval(() => {
    checkProgress();
    if (data.progress_num >= 100) {
      clearInterval(refreshProgress);
      new Player({
        id: "afterVideo",
        url: fileBaseUri + data.fileName
      });
    }
  }, 1000);
};
const transData = () => {
  const json = getData();
  data.progress_num = 0;
  setres(json)
    .then(function (response) {
      data.fileName = response["data"][0]["dst"];
      ElMessage({
        message: "提交成功",
        type: "success"
      });
      refp();
    })
    .catch(function (error) {
      ElMessage({
        message: "链接服务器异常！",
        type: "warning"
      });
      console.log(error);
    });
};
//在按钮点击时，将isSending的值改为true
const handleCheck = () => {
  data.isSending = true;
  tableList();
};

async function tableList() {
  setTimeout(() => {
    data.isSending = false;
  }, 500);
}

const options = [
  {
    value: "rem",
    label: "怀旧"
  },
  {
    value: "film",
    label: "电影"
  },
  {
    value: "hk",
    label: "港风"
  }
];
const options_bubble = [
  {
    value: "1",
    label: "淡绿"
  },
  {
    value: "2",
    label: "紫色"
  }
];

const data = reactive({
  rate: 10,
  rate_ck: false,
  brightness: 200,
  brightness_ck: false,
  contrast: 25,
  contrast_ck: false,
  saturation: 500,
  saturation_ck: false,
  gray: 50,
  gray_ck: false,
  style: "rem",
  style_ck: false,
  bubble: "1",
  bubble_ck: false,
  whitening: 0,
  whitening_ck: false,
  exfoliating: 0,
  exfoliating_ck: false,
  isSending: false,
  fileName: "",
  videoPlayerDialog: false,
  progress_num: -1
});
const getData = () => {
  let result = {
    data: [
      {
        type: "video",
        src: "1.mp4",
        leader: "leader.jpg"
      }
    ]
  };
  let conunt = 0;
  for (let key in data) {
    if (key.endsWith("_ck") && data[key] === true) {
      const mainKey = key.slice(0, -3); // 删除 '_ck' 后缀来获取主键
      if (
        mainKey !== "whitening" &&
        mainKey !== "exfoliating" &&
        mainKey !== "bubble" &&
        mainKey !== "style"
      ) {
        result["data"][0][mainKey] = data[mainKey] / 10;
      } else {
        result["data"][0][mainKey] = data[mainKey];
      }
    }
  }
  return result;
};
const formatTooltip = val => {
  return val / 10;
};
</script>

<style scoped>
.car

/* 默认样式，label在滑块的旁边 */
.item .el-col:first-child {
  display: inline-block;
  vertical-align: middle;
}

.item {
  margin-top: 5px;
}

/* 默认卡片宽度为80%，最大宽度为800px */
.el-card {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
}

.left-align {
  text-align: left;
}

/* 当屏幕宽度小于 768px 时，label置于滑块的上方，并调整卡片宽度为95% */
@media screen and (max-width: 1440px) {
  .item .el-col:first-child {
    display: block;
    margin-bottom: 8px;
  }

  .el-card {
    width: 95%;
  }
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
