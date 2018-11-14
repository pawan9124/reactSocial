import { TweenMax, Back, Power1 } from "gsap";
import Snap from "snapsvg-cjs";

//get all the parallax elements
setTimeout(function() {
  var _layers = [],
    layerElements = document.getElementsByClassName("layer"),
    _scrollY = window.scrollY;

  function init() {
    for (var i = 0; i < layerElements.length; i += 1) {
      var el = layerElements[i];
      var offset = layerElements[i].dataset.offset;
      _layers.push({ el: el, y: 0, offset: offset });
    }
    window.addEventListener("scroll", handle_scroll_for_mountain);
  }

  function handle_scroll_for_mountain(e) {
    _scrollY = window.scrollY;
    animate();
  }

  function animate() {
    console.log("FUCKER PUNCH");
    //_scrollY = window.scrollY;  //for mobile only?
    for (var i = 0; i < _layers.length; i += 1) {
      var oldY = _layers[i].y;
      _layers[i].y = _scrollY * _layers[i].offset;

      if (oldY !== _layers[i].y) {
        TweenMax.to(_layers[i].el, 0.5, {
          y: _layers[i].y,
          overwrite: "all"
        });
      }
    }
  }

  init();

  // For the canvas settings
  //==========================
  if (
    document.getElementById("canvas") !== undefined &&
    document.getElementById("canvas") !== null
  ) {
    let canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d");
    let loaded = 0,
      canvasW = canvas.width,
      canvasH = canvas.height,
      canvasRect = canvas.getBoundingClientRect(),
      winCenter = window.innerHeight / 2,
      layers = [
        { url: "./img/2-mask.png", offset: 0, x: 0, y: 40 },
        { url: "./img/2-light.png", offset: 2, x: 150, y: 140 },
        { url: "./img/2-layer3.png", offset: -0.4, x: 130, y: 140 },
        { url: "./img/2-layer2.png", offset: -0.3, x: 100, y: 100 },
        { url: "./img/2-layer1.png", offset: -0.2, x: 40, y: 70 }
      ];

    for (let i = 0; i < layers.length; i++) {
      let img = new Image();
      img.src = require("" + layers[i].url);
      img.onload = handle_img_load();
      layers[i].img = img;
    }

    function handle_img_load() {
      loaded += 1;
      if (loaded === layers.length) {
        setTimeout(() => {
          animateCave();
        }, 500);
      }
    }

    window.addEventListener("scroll", handle_scroll_cave);

    function handle_scroll_cave() {
      canvasRect = canvas.getBoundingClientRect();
      animateCave();
      console.log("hgfghjk");
    }

    function animateCave() {
      //clearing the canvas to prevent from redrawing from top
      ctx.clearRect(0, 0, canvasW, canvasH);

      ctx.fillStyle = "#1B323D";
      ctx.globalCompositeOperation = "source-over";
      ctx.fillRect(0, 0, canvasW, canvasH);

      //get the half center from the top and adding
      var elCenter = canvasRect.top + canvasH / 2;
      var distFromCenter = elCenter - winCenter;

      for (let i = layers.length - 1; i > -1; i--) {
        //getting the y position by multiplying the distance from center and the offset
        var _y = layers[i].y + distFromCenter * layers[i].offset;

        if (i === 0) {
          //it paint the last mask inside the destination
          ctx.globalCompositeOperation = "destination-in";
        }
        ctx.drawImage(layers[i].img, layers[i].x, _y);
      }
    }
    //=================================================================
    // for the scroll of light effect
    //=================================================================
    let svg = document.getElementById("scrollPath"),
      path = document.getElementById("scrollLine"),
      light = document.getElementById("light"),
      bg = document.getElementById("scrollBg"),
      rect = bg.getBoundingClientRect(),
      points = path.getAttribute("points"),
      pointArray = points.split(/[ ,]+/),
      winCenterRepeat = window.innerHeight / 2,
      rectH = svg.clientHeight,
      values = [],
      dur = 1;

    for (let i = 0; i < pointArray.length - 2; i += 2) {
      let x = parseFloat(pointArray[i]) + rect.left,
        y = parseFloat(pointArray[i + 1]);

      values.push({
        x: x - light.width / 2,
        y: y - light.width / 2
      });
    }

    TweenMax.set(light, { x: values[0].x, y: values[0].y });
    let tween = new TweenMax(light, dur, {
      bezier: {
        values: values,
        curviness: 0
      },
      paused: true
    });

    window.addEventListener("scroll", handle_scroll_line_curve);
    animateLight();

    function handle_scroll_line_curve() {
      rect = bg.getBoundingClientRect();
    }

    function animateLight() {
      let elCenter = rect.top + rectH / 2,
        distFromCenter = -(elCenter - winCenterRepeat),
        time = distFromCenter / 1000;

      time -= dur / 2;
      tween.time(time);

      requestAnimationFrame(animateLight);
    }

    // //====================== Mouse Parallax Effects =================

    var assets = [
        { url: "./img/4-layer4.svg", x: -100, y: -100, offset: -0.4 },
        { url: "./img/4-layer3.svg", x: -100, y: -150, offset: -0.3 },
        { url: "./img/4-layer2.svg", x: -90, y: 180, offset: -0.2 },
        { url: "./img/4-layer1.svg", x: -190, y: 230, offset: -0.1 },
        { url: "./img/4-logo.svg", x: 155, y: 70, offset: 0.1 },
        { url: "./img/4-border.svg", x: 20, y: 20, offset: 0 },
        { url: "./img/4-mask.svg", x: 0, y: 0, offset: 0 }
      ],
      scrollLayers = [],
      w = 505,
      h = 460,
      loadedSecond = 0,
      container = document.getElementById("container"),
      s = new Snap(w, h),
      c,
      g,
      grad,
      gradEl;

    container.appendChild(s.node);
    TweenMax.set(s.node, { scale: 0.9 });

    g = s.g();
    c = s.g();
    g.append(c);

    for (let i = 0; i < assets.length; i++) {
      let img = new Image();
      img.src = require("" + assets[i].url);
      img.onload = handle_load;

      let _img = s.image(require("" + assets[i].url), assets[i].x, assets[i].y);
      c.append(_img);
      scrollLayers.push(_img);
    }

    function handle_load() {
      loadedSecond += 1;

      if (loadedSecond === assets.length) {
        handle_loaded();
      }
    }

    function handle_loaded() {
      let _mask = scrollLayers[scrollLayers.length - 1];
      g.attr({ mask: _mask });

      grad = s.gradient("l(0,0,1,1)rgba(0,0,0,0.5)-rgba(0,0,0,0):75");
      gradEl = s.rect(0, 0, w, h);
      gradEl.attr({ fill: grad, opacity: 1 });
      g.append(gradEl);

      container.addEventListener("mousemove", handle_mousemove);
      container.addEventListener("mouseout", handle_mouseout);
      container.addEventListener("mouseover", handle_mouseover);
    }

    function handle_mousemove(e) {
      let dx = e.offsetX - w / 2;
      let dy = e.offsetY - h / 2;
      let angle = Math.atan2(dy, dx);
      let opacity = Math.sqrt(dx * dx + dy * dy);

      for (let i = 0; i < scrollLayers.length; i++) {
        let l = scrollLayers[i];
        let _x = dx * assets[i].offset;
        let _y = dy * assets[i].offset;
        TweenMax.to(l.node, 0.1, { x: _x, y: _y });
      }

      let points = angleToPoints(angle);
      grad.attr(points);

      TweenMax.to(gradEl.node, 0.1, { opacity: opacity / 300 });
      TweenMax.to(s.node, 0.2, { rotationX: -dy / 10, rotationY: dx / 10 });
    }

    function handle_mouseout(e) {
      for (let i = 0; i < scrollLayers.length; i++) {
        let l = scrollLayers[i];
        TweenMax.to(l.node, 0.2, { x: 0, y: 0, ease: Power1.easeOut });
      }
      TweenMax.to(gradEl.node, 0.2, { opacity: 0 });
      TweenMax.to(s.node, 0.2, {
        scale: 0.9,
        rotationX: 0,
        rotationY: 0,
        ease: Power1.easeOut
      });
    }

    function handle_mouseover(e) {
      TweenMax.to(s.node, 0.2, { scale: 1, ease: Back.easeOut });
    }

    function angleToPoints(angle) {
      let segment = Math.floor((angle / Math.PI) * 2) + 2;
      let diagonal = ((1 / 2) * segment + 1 / 4) * Math.PI;
      let op = Math.cos(Math.abs(diagonal - angle)) * Math.sqrt(2);
      let x = op * Math.cos(angle);
      let y = op * Math.sin(angle);

      return {
        x1: x < 0 ? 1 : 0,
        y1: y < 0 ? 1 : 0,
        x2: x >= 0 ? x : x + 1,
        y2: y >= 0 ? y : y + 1
      };
    }

    // //==================================================================
    // To scroll for the change in the behaviour after some distance

    function updateInview() {
      var elems = document.querySelectorAll("[data-inview]"),
        i;

      for (i = 0; i < elems.length; i++) {
        var rect = elems[i].getBoundingClientRect(),
          prevValue = elems[i].dataset.inview,
          newValue,
          inviewEvent;

        if (rect.top > window.innerHeight || rect.bottom < 0) {
          newValue = "0";
        } else if (
          rect.top < window.innerHeight / 2 - rect.height / 2 &&
          rect.top > 0
        ) {
          newValue = "3";
        } else if (rect.bottom < window.innerHeight && rect.top > 0) {
          newValue = "2";
        } else {
          newValue = "1";
        }

        if (newValue !== prevValue) {
          elems[i].dataset.inview = newValue;
          inviewEvent = new CustomEvent("inview", { detail: newValue });
          elems[i].dispatchEvent(inviewEvent);
        }
      }
    }

    function addInviewListener() {
      var elems = document.querySelectorAll("[data-inview]"),
        triggerStatus = document.getElementById("triggerStatus"),
        i;

      for (i = 0; i < elems.length; i++) {
        elems[i].addEventListener("inview", function(e) {
          switch (e.detail) {
            case "0":
              triggerStatus.innerHTML = "0: Element outside of viewport";
              break;
            case "1":
              triggerStatus.innerHTML = "1: Element partially in viewport";
              break;
            case "2":
              triggerStatus.innerHTML =
                "2: Element inside viewport but below center";
              break;
            case "3":
              triggerStatus.innerHTML =
                "3: Element inside viewport above center";
              break;
            default:
          }
          console.log("inview:" + e.detail);
        });
      }
    }

    addInviewListener();
    requestAnimationFrame(loop);

    var scrolled = false;

    window.addEventListener("scroll", function() {
      scrolled = true;
    });

    function loop() {
      if (scrolled) {
        updateInview();
      }
      scrolled = false;
      requestAnimationFrame(loop);
    }
  }
}, 1000);
