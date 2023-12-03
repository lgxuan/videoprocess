<template>
  <el-card shadow="never">
    <template #header>
      <div class="card-header">
        <span class="font-medium"> 图片上传 </span>
      </div>
    </template>
    <el-upload
      class="upload-demo"
      drag
      :action="flaskApi('upload_image')"
      :headers="headers"
      :on-success="succ"
      multiple
      :show-file-list="false"
      accept=".jpg"
    >
      <el-icon class="el-icon--upload"><upload-filled /></el-icon>
      <div class="el-upload__text">
        可以将文件直接拖到这里 <em>或点击上传</em>
      </div>
      <template #tip>
        <div class="el-upload__tip">上传视频,格式为jpg</div>
      </template>
    </el-upload>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { flaskApi } from "../../api/utils";
import { UploadFilled } from "@element-plus/icons-vue";
import { refreshTokenApi } from "@/api/user";
import { getToken } from "@/utils/auth";
import { ElMessage } from "element-plus";
const headers = ref({});
onMounted(() => {
  getheaders();
});
const getheaders = () => {
  refreshTokenApi({ refreshToken: getToken()["refreshToken"] }).then(data => {
    headers.value = {
      Authorization: "Bearer " + data.data.accessToken
    };
  });
};
const succ = () => {
  ElMessage({
    message: "上传成功,请在视频处理中查看",
    type: "success"
  });
};
</script>
