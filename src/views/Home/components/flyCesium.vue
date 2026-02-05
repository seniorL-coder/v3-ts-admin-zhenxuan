<!--<template>-->
<!--  <div ref="container" class="cesium-container"></div>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import { ref, onMounted, onUnmounted } from 'vue'-->
<!--import {-->
<!--  Viewer,-->
<!--  Cartesian3,-->
<!--  Color,-->
<!--  Cartographic,-->
<!--  PolylineGlowMaterialProperty,-->
<!--  CallbackProperty,-->
<!--  type PositionProperty,-->
<!--  Entity,-->
<!--  ScreenSpaceEventType,-->
<!--  ImageryLayer,-->
<!--  Math as CesiumMath,-->
<!--} from 'cesium'-->
<!--import {-->
<!--  ArcGisMapServerImageryProvider,-->
<!--  ScreenSpaceEventHandler,-->
<!--  WebMapTileServiceImageryProvider,-->
<!--} from '@cesium/engine'-->
<!--import 'cesium/Build/Cesium/Widgets/widgets.css'-->
<!--import { WORLD_CAPITALS } from '../data/capitals.ts'-->

<!--const container = ref<HTMLDivElement | null>(null)-->
<!--let viewer: Viewer | null = null-->
<!--let nightLayer: ImageryLayer-->
<!--let dayLayer: ImageryLayer-->

<!--/* ========== 初始化 Viewer ========== */-->
<!--async function initViewer() {-->
<!--  viewer = new Viewer(container.value as HTMLDivElement, {-->
<!--    animation: false,-->
<!--    timeline: false,-->
<!--    baseLayerPicker: false,-->
<!--    fullscreenButton: false,-->
<!--    geocoder: false,-->
<!--    homeButton: false,-->
<!--    sceneModePicker: false,-->
<!--    navigationHelpButton: false,-->
<!--    infoBox: false,-->
<!--    selectionIndicator: false,-->
<!--  })-->

<!--  // 🔥 关键：移除默认底图-->
<!--  viewer.imageryLayers.removeAll()-->

<!--  // 🔥 添加高清影像（TS 100% 认可）-->
<!--  const imageryProvider = await ArcGisMapServerImageryProvider.fromUrl(-->
<!--    'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer',-->
<!--  )-->

<!--  dayLayer = viewer.imageryLayers.addImageryProvider(imageryProvider)-->
<!--  dayLayer.brightness = 0.28-->
<!--  dayLayer.contrast = 0.85-->
<!--  dayLayer.gamma = 0.6-->

<!--  const nightProvider = new WebMapTileServiceImageryProvider({-->
<!--    url: 'https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/wmts.cgi',-->
<!--    layer: 'VIIRS_Black_Marble',-->
<!--    style: 'default',-->
<!--    format: 'image/png',-->
<!--    tileMatrixSetID: 'GoogleMapsCompatible_Level8',-->
<!--    maximumLevel: 8,-->
<!--  })-->

<!--  nightLayer = viewer.imageryLayers.addImageryProvider(nightProvider)-->
<!--  nightLayer.alpha = 0.75-->
<!--  nightLayer.brightness = 1.0 // ⛔ 不要太高-->
<!--  nightLayer.contrast = 1.6 // ⭐ 提对比-->
<!--  nightLayer.gamma = 1.8 // ⭐ 压蓝神器-->

<!--  // ⭐ 关键：恢复地球为“正常影像模式”-->
<!--  viewer.scene.globe.material = undefined-->

<!--  // 关闭会染色的光照（大屏通常不开）-->
<!--  viewer.scene.globe.enableLighting = false-->

<!--  // 保留天空，但不影响地球颜色-->
<!--  if (viewer.scene.skyAtmosphere) {-->
<!--    viewer.scene.skyAtmosphere.show = true-->
<!--  }-->

<!--  // 防止深度测试导致颜色异常-->
<!--  viewer.scene.globe.depthTestAgainstTerrain = false-->

<!--  // viewer.scene.globe.enableLighting = true-->
<!--  viewer.scene.backgroundColor = Color.BLACK-->
<!--  if (viewer.scene.skyAtmosphere) {-->
<!--    viewer.scene.skyAtmosphere.show = true-->
<!--  }-->

<!--  // 默认视角-->
<!--  viewer.camera.setView({-->
<!--    destination: Cartesian3.fromDegrees(105, 30, 20000000),-->
<!--  })-->

<!--  viewer.resolutionScale = window.devicePixelRatio-->
<!--  viewer.scene.postProcessStages.fxaa.enabled = true-->
<!--  viewer.scene.msaaSamples = 4-->

<!--  viewer.imageryLayers.raiseToTop(nightLayer)-->

<!--  // 场景-->
<!--  viewer.scene.globe.material = undefined-->
<!--  viewer.scene.globe.enableLighting = false-->
<!--  viewer.scene.globe.depthTestAgainstTerrain = false-->
<!--}-->

<!--/* ========== 地球自动旋转 ========== */-->
<!--let rotating = true-->

<!--function startRotate() {-->
<!--  viewer!.clock.onTick.addEventListener(() => {-->
<!--    if (!rotating) return-->
<!--    viewer!.scene.camera.rotate(Cartesian3.UNIT_Z, -0.02)-->
<!--  })-->
<!--}-->
<!--function addCityPoint(lng: number, lat: number, name?: string) {-->
<!--  if (!viewer) return-->

<!--  viewer.entities.add({-->
<!--    position: Cartesian3.fromDegrees(lng, lat),-->
<!--    point: {-->
<!--      pixelSize: 10,-->
<!--      color: Color.CYAN,-->
<!--    },-->
<!--    properties: {-->
<!--      lng,-->
<!--      lat,-->
<!--      name: name ?? '',-->
<!--    },-->
<!--  })-->
<!--}-->
<!--// 注册全局点击事件-->
<!--function registerClickEvent() {-->
<!--  if (!viewer) return-->

<!--  const handler = new ScreenSpaceEventHandler(viewer.scene.canvas)-->

<!--  handler.setInputAction((movement: ScreenSpaceEventHandler.PositionedEvent) => {-->
<!--    const picked = viewer!.scene.pick(movement.position)-->
<!--    if (!picked || !picked.id) return-->

<!--    const entity = picked.id as Entity-->
<!--    const props = entity.properties-->
<!--    if (!props) return-->

<!--    // ✅ 只响应城市-->
<!--    if (props.type?.getValue() !== 'city') return-->

<!--    const lng = props.lng.getValue()-->
<!--    const lat = props.lat.getValue()-->

<!--    // ⛔ 停止旋转-->
<!--    rotating = false-->
<!--    // 🔹 隐藏夜景图层-->
<!--    if (nightLayer) nightLayer.show = false-->

<!--    // 🔹 调整白天图层亮度，让放大时像白天-->
<!--    if (dayLayer) {-->
<!--      dayLayer.brightness = 1.2-->
<!--      dayLayer.contrast = 1.0-->
<!--      dayLayer.gamma = 1.0-->
<!--    }-->

<!--    viewer!.camera.flyTo({-->
<!--      destination: Cartesian3.fromDegrees(lng, lat, 1_200_000),-->
<!--      duration: 1.5,-->
<!--      complete: () => {-->
<!--        // ✅ 飞行结束再继续旋转-->
<!--        rotating = true-->
<!--        viewer!.scene.camera.rotate(Cartesian3.UNIT_Z, -0.0005)-->
<!--      },-->
<!--    })-->
<!--  }, ScreenSpaceEventType.LEFT_CLICK)-->
<!--}-->

<!--/* ========== 生成弧形飞线 ========== */-->
<!--function createFlyLine(start: Cartesian3, end: Cartesian3, height = 600000): Cartesian3[] {-->
<!--  const positions: Cartesian3[] = []-->
<!--  const count = 80-->

<!--  for (let i = 0; i <= count; i++) {-->
<!--    const t = i / count-->
<!--    const cart = Cartesian3.lerp(start, end, t, new Cartesian3())-->

<!--    const carto = Cartographic.fromCartesian(cart)-->
<!--    carto.height += Math.sin(Math.PI * t) * height-->

<!--    positions.push(Cartesian3.fromRadians(carto.longitude, carto.latitude, carto.height))-->
<!--  }-->

<!--  return positions-->
<!--}-->

<!--/* ========== 发光飞线 ========== */-->
<!--function addFlyLineCurve(positions: Cartesian3[]) {-->
<!--  if (!viewer) return-->

<!--  viewer.entities.add({-->
<!--    polyline: {-->
<!--      positions,-->
<!--      width: 3, // ⭐ 稍微加粗-->
<!--      material: new PolylineGlowMaterialProperty({-->
<!--        color: Color.ORANGE,-->
<!--        glowPower: 0.2, // ⭐ 降低模糊-->
<!--      }),-->
<!--      clampToGround: false,-->
<!--    },-->
<!--  })-->
<!--}-->

<!--/* ========== 信号点飞行（循环） ========== */-->
<!--function addLoopSignal(positions: Cartesian3[]) {-->
<!--  if (!viewer) return-->

<!--  let progress = 0-->

<!--  const position = new CallbackProperty(() => {-->
<!--    progress += 0.1 // ⭐ 飞行速度-->
<!--    if (progress > 1) progress = 0-->

<!--    const index = Math.floor(progress * (positions.length - 1))-->
<!--    return positions[index]-->
<!--  }, false) as unknown as PositionProperty-->

<!--  viewer.entities.add({-->
<!--    position,-->
<!--    point: {-->
<!--      pixelSize: 6,-->
<!--      color: Color.CYAN,-->
<!--      outlineColor: Color.WHITE,-->
<!--      outlineWidth: 1,-->
<!--    },-->
<!--  })-->
<!--}-->

<!--function addRandomCityFlyLines(count = 10) {-->
<!--  if (!viewer) return-->

<!--  for (let i = 0; i < count; i++) {-->
<!--    const from = WORLD_CAPITALS[Math.floor(Math.random() * WORLD_CAPITALS.length)]-->
<!--    let to = WORLD_CAPITALS[Math.floor(Math.random() * WORLD_CAPITALS.length)]-->

<!--    // 防止自己飞自己-->
<!--    while (to === from) {-->
<!--      to = WORLD_CAPITALS[Math.floor(Math.random() * WORLD_CAPITALS.length)]-->
<!--    }-->

<!--    const start = Cartesian3.fromDegrees(from!.lng, from!.lat)-->
<!--    const end = Cartesian3.fromDegrees(to!.lng, to!.lat)-->

<!--    const height = 400000 + Math.random() * 600000-->
<!--    const curve = createFlyLine(start, end, height)-->

<!--    addFlyLineCurve(curve)-->
<!--    addLoopSignal(curve)-->
<!--  }-->
<!--}-->

<!--onMounted(() => {-->
<!--  initViewer()-->
<!--  startRotate()-->
<!--  WORLD_CAPITALS.forEach((c) => {-->
<!--    addCityPoint(c.lng, c.lat, c.city)-->
<!--  })-->
<!--  registerClickEvent()-->
<!--  addRandomCityFlyLines(50)-->
<!--})-->

<!--onUnmounted(() => {-->
<!--  viewer?.destroy()-->
<!--  viewer = null-->
<!--})-->
<!--</script>-->

<!--<style scoped>-->
<!--.cesium-container {-->
<!--  width: 100%;-->
<!--  height: calc(100vh - 16px - 60px - 100px);-->
<!--}-->

<!--/* 去除 Cesium logo */-->
<!--:deep(.cesium-widget-credits) {-->
<!--  display: none !important;-->
<!--}-->
<!--</style>-->
