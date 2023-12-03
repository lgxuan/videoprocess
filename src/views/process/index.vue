<!-- eslint-disable vue/valid-v-for -->
<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 视频处理 </span>
      </div>
    </template>
    <center>
      <div id="beforeVideo" :v-if="data.videoPlayerDialog" />
    </center>

    <el-form-item label="视频名搜索(模糊)">
      <el-input
        v-model="data.search"
        class="!w-[220px]"
        placeholder="输入要查询的视频名"
      />
    </el-form-item>
    <el-form-item label="人物图片名搜搜(模糊)">
      <el-input
        v-model="data.searchPic"
        class="!w-[220px]"
        placeholder="输入要查询的图片名"
      />
    </el-form-item>
    <el-form-item label="视频选择">
      <el-select
        v-model="data.selectedFile"
        class="!w-[220px]"
        placeholder="选择视频"
      >
        <el-option
          v-for="item in data.searchResult"
          :label="item['src'] + ' time:' + formatDateToChinese(item['date'])"
          :value="item['src']"
        />
      </el-select>
    </el-form-item>
    <el-form-item label="人物图片选择">
      <el-select
        v-model="data.selectedpicFile"
        class="!w-[220px]"
        placeholder="选择图片"
      >
        <el-option
          v-for="item in data.searchPicResult"
          :label="item['leader'] + ' time:' + formatDateToChinese(item['date'])"
          :value="item['leader']"
        />
      </el-select>
    </el-form-item>
    <el-button
      @click="searchStart()"
      style="width: 100%; margin-top: 10px"
      plain
      >搜索视频</el-button
    >
    <br />
    <el-button
      @click="searchPicStart()"
      style="width: 100%; margin-top: 10px"
      plain
      >搜索人物图片</el-button
    >
    <br />
    <el-button
      type="primary"
      @click="openVideo"
      style="width: 100%; margin-top: 10px"
      plain
      >显示原视频</el-button
    >
    <br />
    <el-button
      type="primary"
      @click="showViewer = true"
      style="width: 100%; margin-top: 10px"
      plain
      >查看图片</el-button
    >
    <div class="item">
      <el-row type="flex" :gutter="20">
        <el-col :span="3" class="left-align">
          <el-checkbox v-model="data.rate_ck" label="倍数" name="type" />
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
          <el-checkbox v-model="data.brightness_ck" label="亮度" name="type" />
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
          <el-checkbox v-model="data.contrast_ck" label="对比度" name="type" />
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
          <el-checkbox v-model="data.gray_ck" label="灰度" name="type" />
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
          <el-checkbox v-model="data.whitening_ck" label="美白" name="type" />
        </el-col>
        <el-col :span="21">
          <el-slider v-model="data.whitening" :min="0" :max="100" />
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-row type="flex" :gutter="20">
        <el-col :span="3" class="left-align">
          <el-checkbox v-model="data.exfoliating_ck" label="磨皮" name="type" />
        </el-col>
        <el-col :span="21">
          <el-slider v-model="data.exfoliating" :min="0" :max="100" />
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-row type="flex" :gutter="20">
        <el-col :span="3" class="left-align">
          <el-checkbox v-model="data.style_ck" label="风格" name="type" />
        </el-col>
        <el-col :span="21">
          <el-select v-model="data.style">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      <el-row type="flex" :gutter="20">
        <el-col :span="3" class="left-align">
          <el-checkbox v-model="data.bubble_ck" label="泡泡" name="type" />
        </el-col>
        <el-col :span="21">
          <el-select v-model="data.bubble">
            <el-option
              v-for="item in options_bubble"
              :key="item.value"
              :label="item.label"
              :value="item.value"
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
  </el-card>
  <ElImageViewer
    v-if="showViewer"
    :url-list="[fileBaseUri + data.selectedpicFile]"
    @close="closeViewer"
  />
</template>

<script setup lang="tsx">
import { reactive, nextTick, onMounted, ref } from "vue";
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
import { videoSearch } from "../../api/searchVideo";
import { LeaderSearch } from "../../api/searchPic";
import { setres, prores } from "../../api/process";
import Player from "xgplayer";
import "xgplayer/dist/index.min.css";

// 定义响应式数据
const showViewer = ref(false);

// 方法定义

const closeViewer = () => {
  showViewer.value = false;
};
onMounted(() => {
  searchStart();
  searchPicStart();
});
const formatDateToChinese = dateStr => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(date);
};
const openVideo = async () => {
  data.videoPlayerDialog = true;
  await nextTick();
  new Player({
    id: "beforeVideo",
    url: fileBaseUri + data.selectedFile,
    lang: "zh",
    // 默认静音
    volume: 0,
    autoplay: false,
    error: "等待视频加载"
  });
};
const searchStart = () => {
  videoSearch(data.search)
    .then(function (response) {
      data.searchResult = response;
    })
    .catch(function (_error) {
      ElMessage({
        message: "链接服务器异常！",
        type: "warning"
      });
    });
};
const searchPicStart = () => {
  LeaderSearch(data.searchPic)
    .then(function (response) {
      data.searchPicResult = response;
    })
    .catch(function (_error) {
      ElMessage({
        message: "链接服务器异常！",
        type: "warning"
      });
    });
};
const checkProgress = () => {
  const submitData = {
    data: [
      {
        src: data.selectedFile,
        dst: data.fileName
      }
    ]
  };
  prores(submitData)
    .then(function (response) {
      data.progress_num = response["data"][0]["result"];
    })
    .catch(function (_error) {
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
  selectedFile: "",
  search: "",
  selectedpicFile: "",
  searchPic: "",
  searchResult: [],
  searchPicResult: [],
  videoPlayerDialog: false,
  progress_num: -1
});
const getData = () => {
  const result = {
    data: [
      {
        type: "video",
        src: data.selectedFile,
        leader: data.selectedpicFile
      }
    ]
  };
  for (const key in data) {
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
