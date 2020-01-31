<template>
  <div class="svg-container"></div>
</template>

<script>
export default {
  name: "hrz-flowchart",
  mounted() {
    let data = {
      id: "process01",
      name: "Process 01",
      // lanes: [
      //   {
      //     id: "lane01",
      //     name: "Lane 01",
      //     before: null,
      //     after: "lane02",
      //     y: 0,
      //     height: 160
      //   },
      //   {
      //     id: "lane02",
      //     name: "Lane 02",
      //     before: "lane01",
      //     after: "lane03",
      //     y: 160,
      //     height: 220
      //   },
      //   {
      //     id: "lane03",
      //     name: "Lane 03",
      //     before: "lane02",
      //     after: null,
      //     y: 380,
      //     height: 256
      //   }
      // ],
      nodes: [
        {
          id: "start",
          laneId: "lane01",
          name: "Step",
          type: "start",
          shape: "circle",
          cx: 60,
          cy: 40,
          width: 40,
          height: 40
        },
        {
          id: "node01",
          laneId: "lane01",
          name: "Step Decision with long name",
          type: "decision",
          shape: "path",
          cx: 220,
          cy: 40,
          width: 120,
          height: 80
        },
        {
          id: "node02",
          laneId: "lane01",
          name: "Step",
          type: "step",
          shape: "rect",
          cx: 440,
          cy: 40,
          width: 160,
          height: 80
        },
        {
          id: "finish",
          laneId: "lane01",
          name: "Step",
          type: "finish",
          shape: "circle",
          cx: 600,
          cy: 40,
          width: 40,
          height: 40
        }
      ],
      links: [
        {
          source: "start",
          target: "node01",
          type: "vertical",
          x1: 80,
          y1: 40,
          x2: 150,
          y2: 40
        },
        {
          source: "node01",
          target: "node02",
          type: "vertical",
          x1: 280,
          y1: 40,
          x2: 350,
          y2: 40
        },
        {
          source: "node02",
          target: "finish",
          type: "vertical",
          x1: 520,
          y1: 40,
          x2: 570,
          y2: 40
        }
      ]
    };

    const localD3 = this.$d3;

    let width = parseInt(localD3.select(".svg-container").style("width"), 10);
    let height = parseInt(localD3.select(".svg-container").style("height"), 10);

    const RESOLUTION = 10;
    const MIN_LANE_HEIGHT = 120;
    const ARROW_SIZE = 10;
    const ROUND_CORNER = 5;
    const CIRCLE = { width: 40, height: 40 };
    const RECT = { width: 160, height: 80 };
    const LOSANGO = { width: 120, height: 80 };

    // let pageZoomScale = 1;
    let isMouseSelectingMultiple = false;

    localD3
      .select(".svg-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .on("click", onClickPage);

    const svg = localD3.select("svg").append("g");

    const defs = svg.append("svg:defs");

    defs
      .append("svg:marker")
      .attr("id", "arrow-default")
      .attr("class", "arrow")
      .attr("refX", 0)
      .attr("refY", 5)
      .attr("markerWidth", ARROW_SIZE)
      .attr("markerHeight", ARROW_SIZE)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 10 5 0 10 Z");

    defs
      .append("svg:marker")
      .attr("id", "arrow-selected")
      .attr("class", "arrow-selected")
      .attr("refX", 0)
      .attr("refY", 5)
      .attr("markerWidth", ARROW_SIZE)
      .attr("markerHeight", ARROW_SIZE)
      .attr("markerUnits", "userSpaceOnUse")
      .attr("orient", "auto")
      .append("path")
      .attr("d", "M 0 0 10 5 0 10 Z");

    const rectGrid = svg
      .append("rect")
      .attr("class", "page-grid")
      .attr("width", width)
      .attr("height", height);

    const onPageZoom = localD3
      .zoom()
      .scaleExtent([0.5, 5])
      .on("zoom", zoomed);

    const onDragNode = localD3
      .drag()
      .filter(function() {
        return true;
      })
      .on("start", onDraggingNodeStarted)
      .on("drag", onDraggingNode);

    // const lineHorizontalGenerate = localD3
    //   .line()
    //   .curve(localD3.curveStepAfter)
    //   .x(d => d.x)
    //   .y(d => d.y);

    // const lineVerticalGenerate = localD3
    //   .line()
    //   .curve(localD3.curveStepBefore)
    //   .x(d => d.x)
    //   .y(d => d.y);

    const lineGenerate = localD3
      .line()
      .curve(localD3.curveStep)
      .x(d => d.x)
      .y(d => d.y);

    svg
      .append("rect")
      .attr("class", "page-zoom")
      .attr("width", width)
      .attr("height", height)
      .on("mousedown", onMouseDownPage)
      .call(onPageZoom)
      .on("dblclickc, onDoubleClickLinklick.zoom", null);

    const gContainer = svg
      .append("g")
      .attr("id", "container")
      .on("mousemove", onMouseMoveContainer);

    const gGrid = gContainer.append("g").attr("id", "grid");
    const gGridVertical = gGrid.append("g").attr("id", "grid-vertical");
    const gGridHorizontal = gGrid.append("g").attr("id", "grid-horizontal");

    const gLaneContainer = gContainer.append("g").attr("id", "lane-container");
    const gLanes = gLaneContainer.append("g").attr("id", "lanes");
    const gLinks = gContainer.append("g").attr("id", "links");
    const gNodes = gContainer.append("g").attr("id", "nodes");

    updateGrid();
    updateLane();
    updateChart();

    function zoomed() {
      if (!localD3.event.ctrlKey) {
        // pageZoomScale = localD3.event.transform.k;
        gContainer.attr("transform", localD3.event.transform);
        rectGrid.attr("transform", localD3.event.transform);
      }
    }

    function getLinePath(lineType, x1, y1, x2, y2) {
      // if (lineType === "horizontal") {
      //   return lineHorizontalGenerate([
      //     { x: x1, y: y1 },
      //     { x: x2, y: y2 }
      //   ]);
      // }

      // return lineVerticalGenerate([
      //   { x: x1, y: y1 },
      //   { x: x2, y: y2 }
      // ]);

      return lineGenerate([
        { x: x1, y: y1 },
        { x: x2, y: y2 }
      ]);
    }

    function getBBox(node) {
      const nodeBBox = node.node().getCTM();
      const nodeType = node.attr("hrz-type");
      const bbox = { cx: nodeBBox.e, cy: nodeBBox.f };
      let size = {};

      if (nodeType === "step") {
        size = RECT;
      } else if (nodeType === "decision") {
        size = LOSANGO;
      } else {
        size = CIRCLE;
      }

      bbox.width = size.width;
      bbox.height = size.height;

      return bbox;
    }

    function getLinePosition(source, target) {
      const sourceBox = getBBox(source);
      const targetBox = getBBox(target);

      const x1 = parseInt(sourceBox.cx + sourceBox.width / 2);
      const y1 = parseInt(sourceBox.cy);
      const x2 = parseInt(targetBox.cx - targetBox.width / 2 - ARROW_SIZE);
      const y2 = parseInt(targetBox.cy);

      const lineType = "vertical";

      // return { x1, y1, x2, y2 };

      // const sourceBox = getBBox(source);
      // const targetBox = getBBox(target);

      // let lineType;
      // let x1;
      // let y1;
      // let x2;
      // let y2;

      // if (
      //   sourceBox.cx + sourceBox.width / 2 < targetBox.cx - targetBox.width / 2 &&
      //   parseInt(
      //     targetBox.cx + targetBox.width / 2 - sourceBox.cx - sourceBox.width / 2
      //   ) >=
      //     25 * RESOLUTION &&
      //   sourceBox.cy > targetBox.cy &&
      //   parseInt(
      //     sourceBox.cy - sourceBox.height / 2 - targetBox.cy + targetBox.height / 2
      //   ) >=
      //     15 * RESOLUTION
      // ) {
      //   lineType = "vertical";

      //   x1 = parseInt(sourceBox.cx);
      //   x2 = parseInt(targetBox.cx - targetBox.width / 2 - ARROW_SIZE);

      //   y1 = parseInt(sourceBox.cy - parseInt(sourceBox.height / 2));
      //   y2 = parseInt(targetBox.cy);
      // }

      return { lineType, x1, y1, x2, y2 };
    }

    function updateLaneContainer() {
      if (data.lanes && data.lanes.length > 0) {
        if (localD3.selectAll("#lanes > *").size() === 0) {
          gLaneContainer
            .append("rect")
            .attr("class", "lane-container")
            .attr("width", width)
            .attr("height", height);

          gLaneContainer
            .append("text")
            .text(data.name)
            .attr("text-anchor", "middle")
            .attr("alignment-baseline", "middle")
            .attr("transform", `translate(20, ${height / 2}) rotate(270)`);

          gLaneContainer
            .append("line")
            .attr("class", "lane-line")
            .attr("x1", 30)
            .attr("y1", 0)
            .attr("x2", 30)
            .attr("y2", height);
        } else {
          localD3
            .select("#lane-container > rect")
            .attr("width", width)
            .attr("height", height);
          localD3
            .select("#lane-container > text")
            .attr("transform", `translate(20, ${height / 2}) rotate(270)`);
          localD3.select("#lane-container > line").attr("y2", height);
        }
      } else {
        localD3.select("#lane-container > rect").remove();
        localD3.select("#lane-container > text").remove();
        localD3.select("#lane-container > line").remove();
      }
    }

    function updateLane() {
      updateLaneContainer();

      gLanes
        .selectAll("g")
        .data(data.lanes)
        .join(
          enter => {
            const gEnter = enter.append("g");

            gEnter
              .append("rect")
              .attr("id", d => `lane_${d.id}`)
              .attr("class", "lane")
              .attr("x", 30)
              .attr("y", d => d.y)
              .attr("width", width - 30)
              .attr("height", d => d.h)
              .on("click", null);

            gEnter
              .append("rect")
              .attr("id", d => `lane_header_${d.id}`)
              .attr("class", "lane-header")
              .attr("x", 30)
              .attr("y", d => d.y)
              .attr("width", 30)
              .attr("height", d => d.h)
              .on("click", onClickLane);

            return gEnter;
          },
          update => {
            update
              .select(".lane")
              .attr("y", d => d.y)
              .attr("width", width - 30)
              .attr("height", d => d.h);

            update
              .select("rect[class^='lane-header']")
              .attr("y", d => d.y)
              .attr("height", d => d.h);

            update
              .select(".lane-label")
              .attr(
                "transform",
                d => `translate(50, ${d.y + d.h / 2}) rotate(270)`
              );

            return update;
          },
          exit => exit.remove()
        );
    }

    function updateGrid() {
      gGridVertical
        .selectAll(".grid-line-vertical")
        .data(localD3.range(1, width / RESOLUTION))
        .join(
          enter => enter.append("line").attr("class", "grid-line-vertical"),
          update => update,
          exit => exit.remove()
        )
        .attr("x1", d => d * RESOLUTION)
        .attr("y1", 0)
        .attr("x2", d => d * RESOLUTION)
        .attr("y2", height);

      gGridHorizontal
        .selectAll(".grid-line-horizontal")
        .data(localD3.range(1, height / RESOLUTION))
        .join(
          enter => enter.append("line").attr("class", "grid-line-horizontal"),
          update => update,
          exit => exit.remove()
        )
        .attr("x1", 0)
        .attr("y1", d => d * RESOLUTION)
        .attr("x2", width)
        .attr("y2", d => d * RESOLUTION);
    }

    function updateChart() {
      gNodes
        .selectAll(".node")
        .data(data.nodes)
        .join(
          enter => {
            const gEnter = enter
              .append("g")
              .attr("id", d => `node_${d.id}`)
              .attr("hrz-id", d => d.id)
              .attr("class", "node")
              .attr("hrz-type", d => d.type)
              .attr("transform", d => `translate(${d.cx}, ${d.cy})`)
              .on("dblclick", onDoubleClickNode)
              .on("click", onClickNode)
              .call(onDragNode);

            gEnter
              .filter(row => row.type === "start" || row.type === "finish")
              .append(d =>
                document.createElementNS(localD3.namespaces.svg, d.shape)
              )
              .attr("class", "node-shape")
              .attr("cx", 0)
              .attr("cy", 0)
              .attr("r", d => d.width / 2)
              .classed("node-start", d => d.type === "start")
              .classed("node-finish", d => d.type === "finish");

            gEnter
              .filter(row => row.type === "step")
              .append(d =>
                document.createElementNS(localD3.namespaces.svg, d.shape)
              )
              .attr("class", "node-shape")
              .attr("x", d => -1 * (d.width / 2))
              .attr("y", d => -1 * (d.height / 2))
              .attr("width", d => d.width)
              .attr("height", d => d.height)
              .attr("rx", ROUND_CORNER)
              .attr("ry", ROUND_CORNER)
              .classed("node-step", true);

            gEnter
              .filter(row => row.type === "decision")
              .append(d =>
                document.createElementNS(localD3.namespaces.svg, d.shape)
              )
              .attr("class", "node-shape")
              .attr("hrz-type", "decision")
              .attr(
                "d",
                "M55.0953 1.39005L3.28917 34.4163C1.97263 35.2211 0.956901 36.4361 0.398172 37.8744C-0.132724 39.2338 -0.132724 40.7432 0.398172 42.1026C0.956966 43.5409 1.97268 44.7559 3.28917 45.5607L55.0953 78.6099C56.5649 79.5187 58.2585 80 59.9864 80C61.7142 80 63.4078 79.5187 64.8774 78.6099L116.711 45.5837C118.027 44.7792 119.043 43.5641 119.602 42.1256C120.133 40.7663 120.133 39.2567 119.602 37.8974C119.043 36.4589 118.027 35.2438 116.711 34.4393L64.8774 1.39005C63.4078 0.481343 61.7142 0 59.9864 0C58.2585 0 56.5649 0.481343 55.0953 1.39005V1.39005Z"
              )
              .attr(
                "transform",
                d => `translate(${-1 * (d.width / 2)}, ${-1 * (d.height / 2)})`
              )
              .classed("node-decision", true);

            gEnter
              .filter(row => row.type === "step" || row.type === "decision")
              .append("foreignObject")
              .attr("x", d => -1 * (d.width / 2))
              .attr("y", d => -1 * (d.height / 2))
              .attr("width", d => d.width)
              .attr("height", d => d.height)
              .html(
                d =>
                  `<div class="node-label-container"><div class="node-label">${d.name}</div></div>`
              );

            return gEnter;
          },
          update => update,
          exit => exit.remove()
        );

      gLinks
        .selectAll(".link")
        .data(data.links)
        .join(
          enter => enter.append("path").on("click", onClickLink),
          update => update,
          exit => exit.remove()
        )
        .attr("id", d => `${d.source}_${d.target}`)
        .attr("class", "link")
        .attr("hrz-source", d => d.source)
        .attr("hrz-target", d => d.target)
        .attr("d", d => getLinePath(d.type, d.x1, d.y1, d.x2, d.y2))
        .on("dblclick", onDoubleClickLink);
    }

    function snapToGrid(p, n) {
      return p % n < n / 2 ? p - (p % n) : p + n - (p % n);
    }

    function getMousePosition(reference) {
      const positionMouse = localD3.mouse(reference.node());

      const mouseX = positionMouse[0];
      const mouseY = positionMouse[1];

      return { mouseX, mouseY };
    }

    function getData(node) {
      return node.data()[0];
    }

    function isInsideContainer(container, node) {
      const containerBox = container.node().getBBox();
      const nodeBox = getBBox(node);

      if (
        (containerBox.x < nodeBox.cx &&
          containerBox.x + containerBox.width >
            nodeBox.cx + nodeBox.width / 2 &&
          containerBox.y < nodeBox.cy &&
          containerBox.y + containerBox.height >
            nodeBox.cy + nodeBox.height / 2) ||
        (containerBox.x > nodeBox.cx &&
          containerBox.x + containerBox.width <
            nodeBox.cx + nodeBox.width / 2 &&
          containerBox.y > nodeBox.cy &&
          containerBox.y + containerBox.height <
            nodeBox.cy + nodeBox.height / 2)
      ) {
        return true;
      }

      return false;
    }

    function finishCreatNewNode() {
      const linkHidden = localD3.select(".link-hidden");

      if (!linkHidden.empty()) {
        data.links = data.links.filter(
          row =>
            row.source !== linkHidden.attr("hrz-source") ||
            row.target !== linkHidden.attr("hrz-target")
        );
        linkHidden.remove();
      }

      const linkNew = localD3.select(".link-new");
      const x1 = linkNew.attr("hrz-x1");
      const y1 = linkNew.attr("hrz-y1");
      const x2 = linkNew.attr("hrz-x2");
      const y2 = linkNew.attr("hrz-y2");

      const source = localD3.select(`#node_${linkNew.attr("hrz-source")}`);
      const sourceId = source.attr("hrz-id");
      const sourceType = source.attr("hrz-type");
      const sourceLinks = localD3.selectAll(`[hrz-source='${sourceId}']`);

      let target = localD3.select(".node-new");
      let targetId = target.attr("hrz-id");

      if (target.classed("node-new-hidden")) {
        target = localD3.select(".node-selected");
        targetId = target.attr("hrz-id");
      } else {
        const targetBox = getBBox(target);

        data.nodes.push({
          id: targetId,
          laneId: null,
          name: target.attr("hrz-new-label"),
          type: "step",
          shape: "rect",
          cx: targetBox.cx,
          cy: targetBox.cy,
          width: targetBox.width,
          height: targetBox.height
        });
      }

      if (sourceType === "step" && sourceLinks.size() > 1) {
        const sourceData = getData(source);
        sourceData.type = "decision";
        sourceData.shape = "path";
        sourceData.width = LOSANGO.width;

        source.select(".node-shape").remove();
        source.select("foreignObject").remove();

        source
          .attr("hrz-type", "decision")
          .append(d =>
            document.createElementNS(localD3.namespaces.svg, d.shape)
          )
          .attr("class", "node-shape")
          .attr("hrz-type", "decision")
          .attr(
            "d",
            "M55.0953 1.39005L3.28917 34.4163C1.97263 35.2211 0.956901 36.4361 0.398172 37.8744C-0.132724 39.2338 -0.132724 40.7432 0.398172 42.1026C0.956966 43.5409 1.97268 44.7559 3.28917 45.5607L55.0953 78.6099C56.5649 79.5187 58.2585 80 59.9864 80C61.7142 80 63.4078 79.5187 64.8774 78.6099L116.711 45.5837C118.027 44.7792 119.043 43.5641 119.602 42.1256C120.133 40.7663 120.133 39.2567 119.602 37.8974C119.043 36.4589 118.027 35.2438 116.711 34.4393L64.8774 1.39005C63.4078 0.481343 61.7142 0 59.9864 0C58.2585 0 56.5649 0.481343 55.0953 1.39005V1.39005Z"
          )
          .attr(
            "transform",
            d => `translate(${-1 * (d.width / 2)}, ${-1 * (d.height / 2)})`
          )
          .classed("node-decision", true);

        source
          .append("foreignObject")
          .attr("x", d => -1 * (d.width / 2))
          .attr("y", d => -1 * (d.height / 2))
          .attr("width", d => d.width)
          .attr("height", d => d.height)
          .html(
            d =>
              `<div class="node-label-container"><div class="node-label">${d.name}</div></div>`
          );
      }

      data.links.push({
        source: sourceId,
        target: targetId,
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2
      });

      clearAllSelection();
      updateChart();
      updatePositionLinks();
    }

    function onClickNewNode() {
      console.log("onClickNewNode");
      localD3.event.stopPropagation();

      const target = localD3.select(".node-new");

      if (target.classed("node-new-stop")) {
        return;
      }

      if (target.classed("node-new-hidden")) {
        finishCreatNewNode();
      } else {
        target
          .classed("node-new-stop", true)
          .append("foreignObject")
          .attr("class", "node-label-editable")
          .attr("x", -1 * (RECT.width / 2))
          .attr("y", -1 * (RECT.height / 2))
          .attr("width", RECT.width)
          .attr("height", RECT.height)
          .html(
            `<div class="node-label-container"><div class="node-label"><input id="input-node-new" type="text" placeholder="Step name..."></div></div>`
          );

        const targetInput = target.select("#input-node-new").node();

        targetInput.addEventListener("keyup", onKeyUpInputNewNode);
        targetInput.focus();
      }
    }

    function onMouseDownPage() {
      console.log("onMouseDownPage");
      if (localD3.event.ctrlKey) {
        const { mouseX, mouseY } = getMousePosition(gContainer);

        gContainer
          .append("rect")
          .attr("class", "rect-selecting-multiple")
          .attr("hrz-x", mouseX)
          .attr("hrz-y", mouseY)
          .attr("x", mouseX)
          .attr("y", mouseY);
        isMouseSelectingMultiple = true;
      }
    }

    function onMouseMoveContainer() {
      console.log("onMouseMoveContainer");

      let target = localD3.select(".node-new");

      if (!target.empty() && !target.classed(".node-new-stop")) {
        const link = localD3.select(".link-new");
        let targetBox = getBBox(target);
        const source = localD3.select(`#node_${link.attr("hrz-source")}`);

        const { mouseX, mouseY } = getMousePosition(gContainer);

        const gridX = snapToGrid(
          Math.max(0, Math.min(width - targetBox.width, mouseX)),
          RESOLUTION
        );
        const gridY = snapToGrid(
          Math.max(0, Math.min(height - targetBox.height, mouseY)),
          RESOLUTION
        );

        target.attr("transform", `translate(${gridX}, ${gridY})`);
        targetBox = getBBox(target);

        const nodeBelow = localD3
          .selectAll(".node")
          .filter(
            row =>
              row &&
              row.type !== "start" &&
              ((row.type === "step" &&
                ((targetBox.cx >= row.cx && targetBox.cx <= row.cx + 70) ||
                  (targetBox.cx >= row.cx - 70 && targetBox.cx <= row.cx)) &&
                ((targetBox.cy >= row.cy && targetBox.cy <= row.cy + 30) ||
                  (targetBox.cy >= row.cy - 30 && targetBox.cy <= row.cy))) ||
                (row.type === "decision" &&
                  ((targetBox.cx >= row.cx && targetBox.cx <= row.cx + 50) ||
                    (targetBox.cx >= row.cx - 50 && targetBox.cx <= row.cx)) &&
                  ((targetBox.cy >= row.cy && targetBox.cy <= row.cy + 30) ||
                    (targetBox.cy >= row.cy - 30 && targetBox.cy <= row.cy))) ||
                (row.type === "finish" &&
                  ((targetBox.cx >= row.cx - RESOLUTION &&
                    targetBox.cx <= row.cx - RESOLUTION + 70) ||
                    (targetBox.cx >= row.cx - RESOLUTION - 70 &&
                      targetBox.cx <= row.cx - RESOLUTION)) &&
                  ((targetBox.cy >= row.cy - RESOLUTION &&
                    targetBox.cy <= row.cy - RESOLUTION + 30) ||
                    (targetBox.cy >= row.cy - RESOLUTION - 30 &&
                      targetBox.cy <= row.cy - RESOLUTION))))
          );
        if (nodeBelow.size() === 0) {
          target.classed("node-new-hidden", false);
          localD3.selectAll(".node-selected").classed("node-selected", false);
        }
        nodeBelow.each(function() {
          target.classed("node-new-hidden", true);
          const targetBelow = localD3.select(this);
          targetBelow.classed("node-selected", true);
          target = targetBelow;
        });

        const { lineType, x1, y1, x2, y2 } = getLinePosition(source, target);

        link
          .attr("hrz-x1", x1)
          .attr("hrz-y1", y1)
          .attr("hrz-x2", x2)
          .attr("hrz-y2", y2)
          .attr("d", getLinePath(lineType, x1, y1, x2, y2));
      }
    }

    function onDoubleClickLink() {
      console.log("onDoubleClickLink");

      clearAllSelection();
      const link = localD3.select(this);
      const source = localD3.select(`#node_${link.attr("hrz-source")}`);

      link.classed("link-hidden", true);

      const { mouseX, mouseY } = getMousePosition(gContainer);

      const id = `node${Math.floor(Math.random() * 1000)}`;

      const target = gNodes
        .append("g")
        .attr("id", `node_${id}`)
        .attr("hrz-id", id)
        .attr("class", "node")
        .attr("hrz-type", "step")
        .attr("transform", `translate(${mouseX}, ${mouseY})`)
        .classed("node-new", true)
        .on("click", onClickNewNode);

      target
        .append("rect")
        .attr("class", "node-shape")
        .attr("x", -1 * (RECT.width / 2))
        .attr("y", -1 * (RECT.height / 2))
        .attr("width", RECT.width)
        .attr("height", RECT.height)
        .attr("rx", ROUND_CORNER)
        .attr("ry", ROUND_CORNER)
        .classed("node-step", true);

      const { lineType, x1, y1, x2, y2 } = getLinePosition(source, target);

      gLinks
        .append("path")
        .attr("class", "link-new")
        .attr("hrz-source", source.attr("hrz-id"))
        .attr("hrz-x1", x1)
        .attr("hrz-y1", y1)
        .attr("hrz-x2", x2)
        .attr("hrz-y2", y2)
        .attr("d", getLinePath(lineType, x1, y1, x2, y2));
    }

    function onDoubleClickNode(d) {
      console.log("onDoubleClickNode");
      if (localD3.event.ctrlKey || d.type === "finish") {
        return;
      }

      clearAllSelection();
      const source = localD3.select(this);
      const sourceId = source.attr("hrz-id");
      const sourceType = source.attr("hrz-type");
      const sourceLinks = localD3.selectAll(`[hrz-source='${sourceId}']`);

      if (sourceType === "start" && sourceLinks.size() > 0) {
        return;
      }

      const { mouseX, mouseY } = getMousePosition(gContainer);

      const id = `node${Math.floor(Math.random() * 1000)}`;

      const target = gNodes
        .append("g")
        .attr("id", `node_${id}`)
        .attr("hrz-id", id)
        .attr("class", "node")
        .attr("hrz-type", "step")
        .attr("transform", `translate(${mouseX}, ${mouseY})`)
        .classed("node-new", true)
        .on("click", onClickNewNode);

      target
        .append("rect")
        .attr("class", "node-shape")
        .attr("x", -1 * (RECT.width / 2))
        .attr("y", -1 * (RECT.height / 2))
        .attr("width", RECT.width)
        .attr("height", RECT.height)
        .attr("rx", ROUND_CORNER)
        .attr("ry", ROUND_CORNER)
        .classed("node-step", true);

      const { lineType, x1, y1, x2, y2 } = getLinePosition(source, target);

      gLinks
        .append("path")
        .attr("class", "link-new")
        .attr("hrz-source", source.attr("hrz-id"))
        .attr("hrz-x1", x1)
        .attr("hrz-y1", y1)
        .attr("hrz-x2", x2)
        .attr("hrz-y2", y2)
        .attr("d", getLinePath(lineType, x1, y1, x2, y2));
    }

    function onClickNode(d) {
      console.log("onClickNode");
      localD3.event.stopPropagation();
      const node = localD3.select(this);
      const isSelected = node.classed("node-selected");

      if (localD3.event.ctrlKey) {
        localD3.selectAll(".link-selected").classed("link-selected", false);

        if (isSelected) {
          switch (d.type) {
            case "start":
              node.classed("node-start", true);
              break;
            case "finish":
              node.classed("node-finish", true);
              break;
            case "step":
              node.classed("node-step", true);
              break;
            case "decision":
              node.classed("node-decision", true);
              break;
          }
          node.classed("node-selected", false);
          localD3
            .selectAll(".node-selected")
            .classed("node-group-selected", false);
        } else {
          node.classed("node-selected", true);
          localD3
            .selectAll(".node-selected")
            .classed("node-group-selected", true);
        }
      } else {
        clearAllSelection();
        node.classed("node-selected", true);
      }
    }

    function onClickLink() {
      console.log("onClickLink");
      localD3.event.stopPropagation();
      clearAllSelection();
      localD3.select(this).classed("link-selected", true);
      console.log(data);
    }

    function selectLane(lane, select) {
      if (!lane.empty()) {
        const parent = localD3.select(lane.node().parentNode);

        if (select) {
          const laneChild = parent.select(".lane");
          const laneHeaderChild = parent.select(".lane-header");

          laneChild.classed("lane-selected", select);
          laneHeaderChild.classed("lane-header-selected", select);

          laneChild.classed("lane", !select);
          laneHeaderChild.classed("lane-header", !select);
        } else {
          const laneChild = parent.select(".lane-selected");
          const laneHeaderChild = parent.select(".lane-header-selected");

          laneChild.classed("lane", !select);
          laneHeaderChild.classed("lane-header", !select);

          laneChild.classed("lane-selected", select);
          laneHeaderChild.classed("lane-header-selected", select);
          localD3.selectAll(".lane-line-selectable").remove();
        }
      }
    }

    function updateLaneSizeDown(lane) {
      const laneData = getData(lane);
      const laneDown = localD3.select(`#lane_${laneData.after}`);

      if (!laneDown.empty()) {
        laneDown.attr("y", d => (d.y = laneData.y + laneData.h));

        updateLaneSizeDown(laneDown);
      }
    }

    function onDraggingLaneLine() {
      console.log("onDraggingLaneLine");

      const mouseY = localD3.event.y;
      const line = localD3.select(this);
      const lane = localD3.select(`#lane_${line.attr("hrz-lane-up")}`);
      const laneData = getData(lane);
      const maxNodeY = localD3.max(
        data.nodes
          .filter(row => row.laneId === laneData.id)
          .map(row => {
            if (row.type === "start" || row.type === "finish") {
              return row.y - 60;
            }

            return row.y;
          })
      );

      if (mouseY - laneData.y > MIN_LANE_HEIGHT && mouseY > maxNodeY + 100) {
        line.attr("y1", mouseY);
        line.attr("y2", mouseY);

        lane.attr("height", d => (d.h = mouseY - d.y));

        updateLaneSizeDown(lane);

        updateLane();
      }
    }

    function onClickLane(d) {
      console.log("onClickLane");
      localD3.event.stopPropagation();

      clearAllSelection();

      selectLane(localD3.select(this), true);

      const onDragLaneLine = localD3.drag().on("drag", onDraggingLaneLine);
      const onLaneLineClick = () => {
        localD3.event.stopPropagation();
      };

      gContainer
        .append("line")
        .attr("class", "lane-line-selectable")
        .attr("hrz-lane-up", d.id)
        .attr("hrz-lane-down", d.after)
        .attr("x1", 30)
        .attr("y1", d.y + d.h)
        .attr("x2", width)
        .attr("y2", d.y + d.h)
        .on("click", onLaneLineClick)
        .call(onDragLaneLine);
    }

    function onClickPage() {
      console.log("onClickPage");
      if (!localD3.event.ctrlKey) {
        clearAllSelection();
      }
    }

    function onDraggingNodeStarted() {
      console.log("onDraggingNodeStarted");
      if (
        !localD3.event.sourceEvent.ctrlKey &&
        localD3.event.sourceEvent.which === 1
      ) {
        const node = localD3.select(this);
        const groupNodes = localD3.selectAll(".node-group-selected");
        if (
          groupNodes.size() === 0 ||
          (groupNodes.size() > 0 && !node.classed("node-group-selected"))
        ) {
          clearAllSelection();
          node.classed("node-selected", true);
        }
      }
    }

    function onDraggingNode(d) {
      console.log("onDraggingNode");
      if (localD3.select(this).classed("node-selected")) {
        const x = localD3.event.x - d.cx;
        const y = localD3.event.y - d.cy;

        let gridX, gridY;

        localD3.selectAll(".node-selected").each(function(n) {
          const node = localD3.select(this);

          gridX = snapToGrid(
            Math.max(0, Math.min(width - n.width, n.cx + x)),
            RESOLUTION
          );
          gridY = snapToGrid(
            Math.max(0, Math.min(height - n.height, n.cy + y)),
            RESOLUTION
          );

          node.attr(
            "transform",
            `translate(${(n.cx = gridX)}, ${(n.cy = gridY)})`
          );

          defineNodeInLane(node);
        });

        updatePositionLinks();
      }
    }

    function defineNodeInLane(node) {
      if (data.lanes && data.lanes.length > 1) {
        localD3.selectAll(".lane").each(function(d) {
          const lane = localD3.select(this);
          const nodeData = getData(node);
          if (nodeData.laneId !== d.id && isInsideContainer(lane, node)) {
            nodeData.laneId = d.id;
          }
        });
      }
    }

    function updatePositionLinks() {
      localD3.selectAll(".link").each(function() {
        localD3.select(this).attr("d", d => {
          const source = localD3.select(`#node_${d.source}`);
          const target = localD3.select(`#node_${d.target}`);

          console.log(getLinePosition(source, target));
          const { lineType, x1, y1, x2, y2 } = getLinePosition(source, target);

          d.type = lineType;
          d.x1 = x1;
          d.y1 = y1;
          d.x2 = x2;
          d.y2 = y2;

          return getLinePath(lineType, x1, y1, x2, y2);
        });
      });
    }

    function updatePositionFromKeyboard(x, y, keyCode) {
      switch (keyCode) {
        case 38:
          y -= RESOLUTION;
          break;
        case 40:
          y += RESOLUTION;
          break;
        case 37:
          x -= RESOLUTION;
          break;
        case 39:
          x += RESOLUTION;
          break;
      }

      return { x, y };
    }

    function clearAllSelection() {
      localD3.selectAll(".node-selected").classed("node-selected", false);
      localD3
        .selectAll(".node-group-selected")
        .classed("node-group-selected", false);
      localD3.selectAll(".link-selected").classed("link-selected", false);
      localD3.selectAll(".link-hidden").classed("link-hidden", false);
      selectLane(localD3.select(".lane-header-selected"), false);

      const nodeNew = localD3.selectAll(".node-new");

      if (!nodeNew.empty()) {
        const linkNew = localD3.selectAll(".link-new");

        nodeNew.remove();
        linkNew.remove();

        updateChart();
      }
    }

    function onResizeWindow() {
      console.log("onResizeWindow");
      width = parseInt(localD3.select(".svg-container").style("width"), 10);
      height = parseInt(localD3.select(".svg-container").style("height"), 10);

      localD3
        .select("svg")
        .attr("width", width)
        .attr("height", height);

      rectGrid.attr("width", width).attr("height", height);

      updateGrid();
      updateLane();
    }

    function onKeyDownDocument(e) {
      if (e.code === "Delete") {
        console.log("onDelete");
        const nodes = localD3.selectAll(".node-selected");

        if (nodes.size() > 0) {
          nodes.each(function(n) {
            if (n.type !== "start") {
              const totalNodeFinish = localD3
                .selectAll("[hrz-type='finish']")
                .size();

              if (n.type !== "finish" || totalNodeFinish > 1) {
                data.links = data.links.filter(
                  row => row.source !== n.id && row.target !== n.id
                );
                data.nodes = data.nodes.filter(row => row.id !== n.id);
                localD3.select(this).remove();
              }
            }
          });
        } else {
          const link = localD3.select(".link-selected");

          if (link) {
            data.links = data.links.filter(
              row =>
                row.source !== link.attr("hrz-source") ||
                row.target !== link.attr("hrz-target")
            );
          }

          link.remove();
        }

        clearAllSelection();
        updateChart();
        return;
      }

      if (e.code === "Escape") {
        console.log("onEscape");
        clearAllSelection();
        return;
      }

      if (
        e.keyCode === 38 ||
        e.keyCode === 40 ||
        e.keyCode === 37 ||
        e.keyCode === 39
      ) {
        console.log("onArrowsKeyboard");
        const nodes = localD3.selectAll(".node-selected");

        if (nodes.size() > 0) {
          nodes.each(function(n) {
            const { x, y } = updatePositionFromKeyboard(n.cx, n.cy, e.keyCode);
            const node = localD3.select(this);

            node.attr("transform", `translate(${(n.cx = x)}, ${(n.cy = y)})`);

            defineNodeInLane(node);
          });

          updatePositionLinks();
          updateChart();
          return;
        }
      }

      if (e.ctrlKey && e.code === "KeyA") {
        console.log("ctrlKey + KeyA");
        localD3.selectAll(".node").classed("node-selected", true);
        localD3.selectAll(".node").classed("node-group-selected", true);
        return;
      }
    }

    function onKeyUpDocument(e) {
      if (isMouseSelectingMultiple && e.key === "Control") {
        isMouseSelectingMultiple = false;
        localD3.select(".rect-selecting-multiple").remove();
        clearAllSelection();
      }
    }

    function onMouseMoveDocument(e) {
      console.log("onMouseMoveDocument");
      if (isMouseSelectingMultiple && e.ctrlKey) {
        // const rect = gContainer.node().getBoundingClientRect();
        // const rect = getBBox(gContainer);
        const rect = gContainer.node().getBBox();
        // const mouseX = e.clientX / pageZoomScale - rect.x;
        // const mouseY = e.clientY / pageZoomScale - rect.y;

        const mouseX = e.clientX - rect.x;
        const mouseY = e.clientY - rect.y;

        const rectSelection = localD3.select(".rect-selecting-multiple");
        const rectSelectionX = rectSelection.attr("hrz-x");
        const rectSelectionY = rectSelection.attr("hrz-y");

        let newX = parseInt(rectSelectionX, 10);
        let newY = parseInt(rectSelectionY, 10);
        const newWidth = Math.abs(mouseX - rectSelectionX);
        const newHeight = Math.abs(mouseY - rectSelectionY);

        if (newX > mouseX) {
          newX = mouseX;
        }

        if (newY > mouseY) {
          newY = mouseY;
        }

        rectSelection
          .attr("x", newX)
          .attr("y", newY)
          .attr("width", newWidth)
          .attr("height", newHeight);

        localD3.selectAll(".node").each(function() {
          const node = localD3.select(this);

          if (isInsideContainer(rectSelection, node)) {
            node.classed("node-selected", true);
            localD3
              .selectAll(".node-selected")
              .classed("node-group-selected", true);
          } else {
            node
              .classed("node-selected", false)
              .classed("node-group-selected", false);
          }
        });
      }
    }

    function onMouseUpDocument(e) {
      console.log("onMouseUpDocument");
      if (isMouseSelectingMultiple && e.ctrlKey) {
        localD3.select(".rect-selecting-multiple").remove();
        isMouseSelectingMultiple = false;
      }
    }

    function onKeyUpInputNewNode(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        const targetInput = gNodes.select("#input-node-new");
        gNodes
          .select(".node-new-stop")
          .attr("hrz-new-label", targetInput.property("value"));
        finishCreatNewNode();
      }
    }

    window.addEventListener("resize", onResizeWindow);
    document.addEventListener("keydown", onKeyDownDocument);
    document.addEventListener("keyup", onKeyUpDocument);
    document.addEventListener("mousemove", onMouseMoveDocument);
    document.addEventListener("mouseup", onMouseUpDocument);
  }
};
</script>

<style lang="scss">
.svg-container {
  width: 100%;
  height: 100%;
  background-color: rgb(212, 212, 212);
  box-sizing: border-box;
  border: 1px solid rgb(212, 212, 212);
}

.page-zoom {
  fill: none;
  pointer-events: all;
}

.page-grid {
  fill: white;
}

.node:not(.node-selected) > .node-shape.node-start {
  fill: rgb(119, 227, 169);
  stroke: rgb(56, 187, 140);
  stroke-width: 2;
  cursor: pointer;
}

.node:not(.node-selected):not(.node-new) > .node-shape.node-step {
  stroke: rgb(95, 176, 228);
  stroke-width: 2;
  fill: rgb(205, 246, 255);
  cursor: pointer;
}

.node:not(.node-selected) > .node-shape.node-decision {
  stroke: rgb(95, 176, 228);
  stroke-width: 2;
  fill: rgb(205, 246, 255);
  cursor: pointer;
}

.node:not(.node-selected) > .node-shape.node-finish {
  fill: rgb(248, 117, 117);
  stroke: rgb(232, 97, 114);
  stroke-width: 2;
  cursor: pointer;
}

.node-selected > .node-shape {
  stroke: rgb(20, 223, 13);
  stroke-width: 4;
  fill: rgb(60, 255, 0);
  cursor: pointer;
}

.node-new > .node-shape {
  stroke: rgb(20, 223, 13);
  stroke-width: 4;
  fill: rgb(60, 255, 0);
  cursor: copy;
  opacity: 0.5;
}

.node > foreignObject > .node-label-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.node > foreignObject > .node-label-container > .node-label {
  pointer-events: none;
  user-select: none;
  word-wrap: break-word;
  text-align: center;
  color: rgb(114, 114, 114);
}

.link {
  fill: none;
  stroke: rgb(95, 176, 228);
  stroke-width: 2px;
  cursor: pointer;
  marker-end: url(#arrow-default);
}

.link-selected {
  fill: none;
  stroke: rgb(20, 223, 13);
  stroke-width: 2;
  cursor: pointer;
  marker-end: url(#arrow-selected);
}

.link-new {
  fill: none;
  stroke: rgb(20, 223, 13);
  stroke-width: 2;
  marker-end: url(#arrow-selected);
  opacity: 0.5;
}

.arrow {
  fill: rgb(95, 176, 228);
}

.arrow-selected {
  fill: rgb(20, 223, 13);
}

.node-new-hidden {
  opacity: 0;
}

.link-hidden {
  opacity: 0;
}

.rect-selecting-multiple {
  stroke: rgb(14, 139, 9);
  stroke-width: 2;
  fill: rgb(60, 255, 0);
  cursor: crosshair;
  opacity: 0.3;
}

.grid-line-vertical,
.grid-line-horizontal {
  stroke: rgb(212, 212, 212);
  stroke-width: 1px;
  shape-rendering: crispEdges;
  pointer-events: none;
}

// .lane-container {
//   fill: none;
//   stroke: rgb(0, 0, 0);
//   stroke-width: 1px;
//   pointer-events: none;
// }

// .lane {
//   fill: none;
//   stroke: rgb(0, 0, 0);
//   stroke-width: 1px;
//   pointer-events: none;
// }

// .lane-selected {
//   stroke: rgb(20, 223, 13);
//   stroke-width: 4;
//   fill: none;
// }

// .lane-header {
//   fill: rgb(204, 204, 204);
//   stroke: rgb(0, 0, 0);
//   stroke-width: 1px;
//   cursor: pointer;
// }

// .lane-header-selected {
//   stroke: rgb(20, 223, 13);
//   stroke-width: 4;
//   fill: rgb(60, 255, 0);
//   cursor: pointer;
// }

// .lane-line {
//   stroke: rgb(0, 0, 0);
//   stroke-width: 1px;
// }

// .lane-line-selectable {
//   stroke: rgb(130, 216, 0);
//   stroke-width: 4px;
//   cursor: ns-resize;
// }

.svg-container text,
.svg-container foreignObject {
  pointer-events: none;
  user-select: none;
}

.node-label-editable {
  pointer-events: all !important;
  user-select: auto !important;
}

.node-label-editable input {
  pointer-events: all !important;
  user-select: auto !important;
}
</style>
