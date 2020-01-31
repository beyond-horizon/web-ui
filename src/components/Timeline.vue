<template>
  <div id="timeline">
    <div id="fixed">
      <div id="timeline-scale">
        <div id="timeline-legend"></div>
      </div>
      <div id="timeline-milestone"></div>
    </div>
    <div id="timeline-lanes">
      <svg width="0" height="0"></svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "hrz-timeline",
  mounted() {
    // Testing data

    // 2 levels lanes
    var two_levels = {
      laneLevels: 2,
      milestones: [],
      lanes: [
        {
          id: "corp",
          name: "CORPORATIVO",
          metrics: [
            {
              name: "BENEFIT",
              type: "currency",
              goal: true,
              actual: 23000000,
              target: 30000000
            },
            {
              name: "TOTAL COST",
              type: "currency",
              goal: false,
              actual: 1650000,
              target: 1800000
            },
            {
              name: "ROI",
              type: "percentage",
              goal: true,
              actual: 45.6,
              target: 65
            }
          ],
          sub_lanes: [
            {
              id: "plan",
              name: "PLANEJAMENTO",
              metrics: [
                {
                  name: "BENEFIT",
                  type: "currency",
                  goal: true,
                  actual: 23000000
                },
                {
                  name: "TOTAL COST",
                  type: "currency",
                  goal: false,
                  actual: 1650000
                },
                {
                  name: "ROI",
                  type: "percentage",
                  goal: true,
                  actual: 45.6
                }
              ],
              objects: [
                {
                  start: "2020-01-01",
                  finish: "2020-06-01",
                  color: "#6C9ED4",
                  line: 0,
                  complete: 35,
                  name: "Consectetur adipiscing elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                },
                {
                  start: "2020-04-01",
                  finish: "2020-10-01",
                  color: "#76B7B2",
                  line: 1,
                  complete: 12,
                  name: "Consectetur adipiscing elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                },
                {
                  start: "2020-06-15",
                  finish: "2020-11-01",
                  color: "#6C9ED4",
                  line: 0,
                  complete: 28,
                  name:
                    "Lorem ipsum dolor sit amet consectetur adipiscing elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                }
              ]
            },
            {
              id: "exec",
              name: "EXECUÇÃO",
              metrics: [
                {
                  name: "BENEFIT",
                  type: "currency",
                  goal: true,
                  actual: 23000000
                },
                {
                  name: "TOTAL COST",
                  type: "currency",
                  goal: false,
                  actual: 1650000
                },
                {
                  name: "ROI",
                  type: "percentage",
                  goal: true,
                  actual: 45.6
                }
              ],
              objects: [
                {
                  start: "2020-04-15",
                  finish: "2020-08-01",
                  color: "#F28E2C",
                  line: 0,
                  complete: 15,
                  name: "Amet consectetur adipiscing elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                }
              ]
            },
            {
              id: "closure",
              name: "ENCERRAMENTO",
              metrics: [
                {
                  name: "BENEFIT",
                  type: "currency",
                  goal: true,
                  actual: 23000000
                },
                {
                  name: "TOTAL COST",
                  type: "currency",
                  goal: false,
                  actual: 1650000
                },
                {
                  name: "ROI",
                  type: "percentage",
                  goal: true,
                  actual: 45.6
                }
              ],
              objects: [
                {
                  start: "2020-02-01",
                  finish: "2020-03-01",
                  color: "#76B7B2",
                  line: 0,
                  complete: 90,
                  name: "Lorem ipsum dolor sit elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                },
                {
                  start: "2020-09-01",
                  finish: "2020-12-31",
                  color: "#F28E2C",
                  line: 0,
                  complete: 85,
                  name: "Lorem ipsum dolor sit amet elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "dept",
          name: "DEPARTAMENTAL",
          metrics: [
            {
              name: "BENEFIT",
              type: "currency",
              goal: true,
              actual: 8000000,
              target: 12000000
            },
            {
              name: "TOTAL COST",
              type: "currency",
              goal: false,
              actual: 258675,
              target: 376891
            },
            {
              name: "ROI",
              type: "percentage",
              goal: true,
              actual: 72.6,
              target: 65
            }
          ],
          sub_lanes: [
            {
              id: "plan",
              name: "PLANEJAMENTO",
              metrics: [
                {
                  name: "BENEFIT",
                  type: "currency",
                  goal: true,
                  actual: 23000000
                },
                {
                  name: "TOTAL COST",
                  type: "currency",
                  goal: false,
                  actual: 1650000
                },
                {
                  name: "ROI",
                  type: "percentage",
                  goal: true,
                  actual: 45.6
                }
              ],
              objects: [
                {
                  start: "2020-01-01",
                  finish: "2020-06-01",
                  color: "#6C9ED4",
                  line: 0,
                  complete: 35,
                  name: "Consectetur adipiscing elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                },
                {
                  start: "2020-06-15",
                  finish: "2020-11-01",
                  color: "#6C9ED4",
                  line: 0,
                  complete: 28,
                  name:
                    "Lorem ipsum dolor sit amet consectetur adipiscing elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                }
              ]
            },
            {
              id: "exec",
              name: "EXECUÇÃO",
              metrics: [
                {
                  name: "BENEFIT",
                  type: "currency",
                  goal: true,
                  actual: 23000000
                },
                {
                  name: "TOTAL COST",
                  type: "currency",
                  goal: false,
                  actual: 1650000
                },
                {
                  name: "ROI",
                  type: "percentage",
                  goal: true,
                  actual: 45.6
                }
              ],
              objects: [
                {
                  start: "2020-04-15",
                  finish: "2020-08-01",
                  color: "#F28E2C",
                  line: 0,
                  complete: 15,
                  name: "Amet consectetur adipiscing elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                }
              ]
            },
            {
              id: "closure",
              name: "ENCERRAMENTO",
              metrics: [
                {
                  name: "BENEFIT",
                  type: "currency",
                  goal: true,
                  actual: 23000000
                },
                {
                  name: "TOTAL COST",
                  type: "currency",
                  goal: false,
                  actual: 1650000
                },
                {
                  name: "ROI",
                  type: "percentage",
                  goal: true,
                  actual: 45.6
                }
              ],
              objects: [
                {
                  start: "2020-02-01",
                  finish: "2020-03-01",
                  color: "#76B7B2",
                  line: 0,
                  complete: 90,
                  name: "Lorem ipsum dolor sit elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                },
                {
                  start: "2020-05-01",
                  finish: "2020-10-01",
                  color: "#76B7B2",
                  line: 0,
                  complete: 90,
                  name: "Lorem ipsum dolor sit elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                },
                {
                  start: "2020-08-01",
                  finish: "2020-12-31",
                  color: "#F28E2C",
                  line: 1,
                  complete: 85,
                  name: "Lorem ipsum dolor sit amet elit",
                  metrics: [
                    {
                      name: "BENEFIT",
                      type: "currency",
                      goal: true,
                      actual: 23000000
                    },
                    {
                      name: "TOTAL COST",
                      type: "currency",
                      goal: false,
                      actual: 1650000
                    },
                    {
                      name: "ROI",
                      type: "percentage",
                      goal: true,
                      actual: 45.6
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    var localD3 = this.$d3;

    var data = two_levels;

    // Global definitions
    var duration = 750;

    var paddingLeft = 30 + 120 * (data.laneLevels - 1);
    var paddingRight = 30;
    var xAxisTop = 30;

    var milestoneLineHeight = 40;
    var milestoneMaxLines = 3;

    var metricWidth = 44;
    var metricHeight = 15;
    var metricSpace = 5;

    var objectBarMetricSpace = -6;

    var objectBarHeight = 30;
    var objectBarRoundedCorner = 4;
    var objectHeight = objectBarHeight + objectBarMetricSpace + metricHeight;
    var linePadding = 20;
    var lineHeight = objectHeight + linePadding * 2;

    var scaleViewWidth = parseInt(
      localD3.select("#timeline-scale").style("width"),
      10
    );
    var scaleWidth = scaleViewWidth;
    var scaleRangeMax = scaleWidth - paddingRight - paddingLeft;
    var scaleStartDate = new Date("2020-01-01");
    var scaleEndDate = new Date("2020-12-31");

    // Timeline scale
    var timelineScaleSVG = localD3
      .select("#timeline-scale")
      .append("svg")
      .attr("width", scaleViewWidth)
      .attr("height", 45);
    var gAxis = timelineScaleSVG.append("g");

    var xScale = localD3.scaleTime();
    var xAxis = localD3.axisTop(xScale);

    function updateScale() {
      scaleViewWidth = parseInt(
        localD3.select("#timeline-scale").style("width"),
        10
      );
      var monthsTicks = localD3.timeMonth.count(scaleStartDate, scaleEndDate);
      xAxis.tickFormat(localD3.timeFormat("%b %Y"));
      var ticksWidth = monthsTicks * 150;
      scaleWidth = ticksWidth > scaleViewWidth ? ticksWidth : scaleViewWidth;

      scaleRangeMax = scaleWidth - paddingRight - paddingLeft;

      xScale
        .domain([scaleStartDate, scaleEndDate])
        .range([0, scaleWidth - paddingRight - paddingLeft]);

      gAxis
        .attr("transform", "translate(" + paddingLeft + "," + xAxisTop + ")")
        .transition()
        .duration(duration)
        .call(xAxis);

      timelineScaleSVG.attr("width", scaleViewWidth);
      timelineMilestoneSVG.attr("width", scaleViewWidth);

      localD3.selectAll("#timeline-lanes svg.lane").attr("width", scaleWidth);
      if (data.laneLevels === 1) {
        renderLane();
      } else {
        renderLaneWithSubLane();
      }

      renderMilestone();
    }

    localD3.select(window).on("resize", updateScale);

    // Timeline milestones
    var timelineMilestoneSVG = localD3
      .select("#timeline-milestone")
      .append("svg")
      .attr("width", scaleViewWidth)
      .attr("height", milestoneLineHeight)
      .on("dblclick", addMilestone);

    var gMilestone = timelineMilestoneSVG.append("g").attr("id", "gMilestone");

    const dragMilestone = localD3
      .drag()
      .on("start", milestoneDragstarted)
      .on("drag", milestoneDragged)
      .on("end", milestoneDragended);

    const dragObject = localD3
      .drag()
      .on("start", objectDragstarted)
      .on("drag", objectDragged)
      .on("end", objectDragended);

    const resizeObject = localD3
      .drag()
      .on("drag", objectResized)
      .on("end", objectResizeended);

    function renderMilestone() {
      const milestoneLines =
        data.milestones.length === 0
          ? 1
          : localD3.max(data.milestones, d => d.line) + 1;

      timelineMilestoneSVG.attr("height", milestoneLineHeight * milestoneLines);
      localD3
        .select("#timeline-lanes")
        .style("margin-top", 87 + milestoneLineHeight * milestoneLines + "px");

      gMilestone.attr(
        "transform",
        "translate(" + (paddingLeft - window.pageXOffset) + ",5)"
      );

      const milestones = gMilestone
        .selectAll("g.milestone")
        .data(data.milestones, d => d.id);
      const milestonesEnter = milestones
        .enter()
        .append("g")
        .attr("class", "milestone")
        .attr("transform", d => {
          const x = xScale(new Date(d.start));
          return "translate(" + x + "," + milestoneLineHeight * d.line + ")";
        })
        .call(dragMilestone)
        .on("click", selectMilestone);

      milestonesEnter
        .append("line")
        .attr("x1", 0)
        .attr("y1", 0)
        .attr("x2", 0)
        .attr("y2", milestoneLineHeight * milestoneMaxLines)
        .style("stroke-dasharray", "3 3")
        .style("stroke", "#7C7C7C");

      milestonesEnter
        .append("path")
        .attr("d", "M0 0 L8 10 L0 20 L-8 10Z")
        .style("fill", (d, i) => localD3.schemeTableau10[(i % 2) + 2]) //TODO: pegar a cor do milestone do array de data
        .style("stroke", "#B7B7B7");

      const gText = milestonesEnter
        .append("g")
        .attr("class", "milestone-text")
        .attr("transform", "translate(10,8)");

      const mText = gText
        .append("text")
        .style("fill", "#9E9E9E")
        .style("font-size", "12px")
        .attr("text-anchor", "start");

      mText
        .append("tspan")
        .attr("x", 0)
        .text(d => d.name);
      mText
        .append("tspan")
        .attr("class", "milestone-date")
        .attr("x", 0)
        .attr("dy", "1.3em")
        .text(d => d.start);

      mText.call(getBB);

      gText
        .insert("rect", "text")
        .attr("width", d => d.bbox.width)
        .attr("height", d => d.bbox.height)
        .attr("y", -10)
        .style("fill", "white");

      const milestonesUpdate = milestonesEnter.merge(milestones);
      milestonesUpdate
        .transition()
        .duration(duration)
        .attr("transform", d => {
          const x = xScale(new Date(d.start));
          return "translate(" + x + "," + milestoneLineHeight * d.line + ")";
        });

      milestonesUpdate.call(updateMilestoneTextPosition);

      milestones
        .exit()
        .transition()
        .duration(duration)
        .style("opacity", 0)
        .remove();
    }

    function updateMilestoneTextPosition(selection) {
      selection.each(function(d) {
        const x = xScale(new Date(d.start));
        const gText = localD3.select(this).select(".milestone-text");
        if (x + paddingLeft >= scaleWidth - paddingRight - d.bbox.width) {
          gText.attr("transform", "translate(-10,8)");
          gText.select("text").attr("text-anchor", "end");
          gText.select("rect").attr("x", -d.bbox.width);
        } else {
          gText.attr("transform", "translate(10,8)");
          gText.select("text").attr("text-anchor", "start");
          gText.select("rect").attr("x", 0);
        }
      });
    }

    function renderLaneWithSubLane() {
      var lanes = localD3
        .select("#timeline-lanes")
        .selectAll("svg.lane")
        .data(data.lanes);

      lanes.exit().remove();

      var lanesEnter = lanes
        .enter()
        .append("svg")
        .attr("class", "lane")
        .attr("width", scaleWidth)
        .attr("height", d => lineHeight * 2 * d.sub_lanes.length + 32); //TODO: calc sublane height //32 = 22px da altura do header + 10px de margem inferior

      var gContainer = lanesEnter.append("g").attr("id", d => "lane_" + d.id);

      // append lane milestones
      gContainer
        .append("g")
        .attr("class", "sub-lane-milestones")
        .attr("transform", "translate(" + paddingLeft + ",0)");

      // append lane header
      var gHeader = gContainer.append("g").attr("class", "lane-header");

      gHeader
        .append("path")
        .attr("fill", "#A5A5A5")
        .attr("d", "M0,22 v-5 Q 0 0 22 0 H" + scaleWidth + " V22 Z");

      gHeader
        .append("text")
        .attr("x", 20)
        .attr("y", 16)
        .attr("class", "title")
        .attr("id", d => "title_" + d.id)
        .text(d => d.name);

      gHeader
        .append("g")
        .attr("class", "header-metrics")
        .attr("transform", d => {
          const bb = localD3
            .select(`text#title_${d.id}`)
            .node()
            .getBBox();
          return "translate(" + (bb.width + 20) + ",-1)";
        })
        .append("foreignObject")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", scaleWidth - 200 + "px")
        .attr("height", 22 + "px")
        .html("<div></div>");

      // append lane su lanes
      gContainer
        .append("g")
        .attr("class", "lane-sub-lanes")
        .attr("transform", "translate(0,22)");

      const lanesUpdate = lanesEnter.merge(lanes);
      lanesUpdate
        .selectAll(".lane-header > path")
        .attr("d", "M0,22 v-5 Q 0 0 22 0 H" + scaleWidth + " V22 Z");

      lanesUpdate.select(".header-metrics").call(renderLaneMetrics);

      lanesUpdate.select(".lane-sub-lanes").call(renderLaneSubLanes);

      lanesUpdate
        .select(".sub-lane-milestones")
        .call(renderLaneMilestonesLines);
    }

    function renderLaneSubLanes(selection) {
      selection.each(function(d) {
        const sublanes = localD3
          .select(this)
          .selectAll("g.sub-lane")
          .data(d.sub_lanes);

        const laneWidth = paddingLeft - 5;
        const laneHeight = lineHeight * 2;

        const sublanesEnter = sublanes
          .enter()
          .append("g")
          .attr("class", "sub-lane")
          .attr("transform", (d, i) => "translate(0," + i * laneHeight + ")");

        sublanesEnter
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", laneWidth)
          .attr("height", laneHeight)
          .attr("fill", "#E9E9E9");

        sublanesEnter
          .append("line")
          .attr("x1", 0)
          .attr("y1", laneHeight - 1)
          .attr("x2", scaleWidth)
          .attr("y2", laneHeight - 1)
          .style("stroke-width", "0.5")
          .style("stroke", "#7C7C7C");

        sublanesEnter
          .append("foreignObject")
          .attr("x", 0)
          .attr("y", 10)
          .attr("width", laneWidth)
          .attr("height", lineHeight - 20)
          .html(d => '<div class="title">' + d.name + "</div>");

        sublanesEnter
          .append("g")
          .attr("class", "sub-lane-metrics metrics-vertical")
          .attr(
            "transform",
            d =>
              "translate(" +
              (laneWidth - metricWidth) +
              "," +
              (laneHeight -
                5 -
                d.metrics.length * (metricHeight + metricSpace)) +
              ")"
          );

        sublanesEnter
          .append("g")
          .attr("class", "sub-lane-metrics-labels")
          .attr(
            "transform",
            d =>
              "translate(0," +
              (laneHeight -
                5 -
                d.metrics.length * (metricHeight + metricSpace)) +
              ")"
          );

        sublanesEnter.append("g").attr("class", "sub-lane-lines");

        sublanesEnter
          .append("g")
          .attr("class", "sub-lane-objects")
          .attr("transform", "translate(" + paddingLeft + ",0)");

        const sublanesUpdate = sublanesEnter.merge(sublanes);

        sublanesUpdate.attr(
          "transform",
          (d, i) => "translate(0," + i * laneHeight + ")"
        );

        sublanesUpdate.select(".sub-lane-metrics").call(renderMetrics);

        sublanesUpdate
          .select(".sub-lane-metrics-labels")
          .call(renderSubLaneMetricsLabels);

        sublanesUpdate.select(".sub-lane-objects").call(renderLaneObjects);

        sublanesUpdate.select(".sub-lane-lines").call(renderLaneLines);
      });
    }

    function renderSubLaneMetricsLabels(selection) {
      selection.each(function(d) {
        const labels = localD3
          .select(this)
          .selectAll("text")
          .data(d.metrics);

        labels
          .enter()
          .append("text")
          .text(d => d.name)
          .attr("x", 5)
          .attr("y", (d, i) => 12 + (metricHeight * i + metricSpace * i));
      });
    }

    function renderLane() {
      const lanes = localD3
        .select("#timeline-lanes")
        .selectAll("svg.lane")
        .data(data.lanes);

      const lanesEnter = lanes
        .enter()
        .append("svg")
        .attr("class", "lane")
        .attr("width", scaleWidth)
        .attr("height", d => {
          const totalLines = localD3.max(d.objects, d => d.line) + 1;
          return totalLines * lineHeight + 32; //32 = 22px da altura do header + 10px de margem inferior
        });

      var gContainer = lanesEnter.append("g").attr("id", d => "lane_" + d.id);

      // append lane milestones
      gContainer
        .append("g")
        .attr("class", "lane-milestones")
        .attr("transform", "translate(" + paddingLeft + ",0)");

      // append lane horizontal lines
      gContainer
        .append("g")
        .attr("class", "lane-lines")
        .attr("transform", "translate(" + paddingLeft + ",22)");
      // append lane header
      const gHeader = gContainer.append("g").attr("class", "lane-header");

      gHeader
        .append("path")
        .attr("fill", "#A5A5A5")
        .attr("d", "M0,22 v-5 Q 0 0 22 0 H" + scaleWidth + " V22 Z");

      gHeader
        .append("text")
        .attr("x", 20)
        .attr("y", 16)
        .attr("class", "title")
        .attr("id", d => "title_" + d.id)
        .text(d => d.name);

      gHeader
        .append("g")
        .attr("class", "header-metrics")
        .attr("transform", d => {
          const bb = localD3
            .select(`text#title_${d.id}`)
            .node()
            .getBBox();
          return "translate(" + (bb.width + 20) + ",-1)";
        })
        .append("foreignObject")
        .attr("x", "0px")
        .attr("y", "0px")
        .attr("width", scaleWidth - 200)
        .attr("height", 22)
        .html("<div></div>");

      // append lane objects
      gContainer
        .append("g")
        .attr("class", "lane-objects")
        .attr("transform", "translate(" + paddingLeft + ",22)");

      const lanesUpdate = lanesEnter.merge(lanes);
      lanesUpdate
        .selectAll(".lane-header > path")
        .attr("d", "M0,22 v-5 Q 0 0 22 0 H" + scaleWidth + " V22 Z");

      lanesUpdate.select(".header-metrics").call(renderLaneMetrics);

      lanesUpdate.select(".lane-milestones").call(renderLaneMilestonesLines);

      lanesUpdate.select(".lane-objects").call(renderLaneObjects);

      lanesUpdate.select(".lane-lines").call(renderLaneLines);
    }

    function renderLaneLines(selection) {
      selection.each(function(d) {
        const totalLines = localD3.max(d.objects, d => d.line);
        for (var i = 1; i <= totalLines; i++) {
          localD3
            .select(this)
            .append("line")
            .attr("x1", paddingLeft)
            .attr("y1", lineHeight * i)
            .attr("x2", scaleWidth - paddingRight)
            .attr("y2", lineHeight * i)
            .style("stroke-dasharray", "4 4")
            .style("stroke", "#E0E0E0");
        }
      });
    }

    function renderLaneObjects(selection) {
      selection.each(function(d) {
        const objects = localD3
          .select(this)
          .selectAll("g.lane-object")
          .data(d.objects);

        const objectsEnter = objects
          .enter()
          .append("g")
          .attr("class", "lane-object")
          .attr("transform", d => {
            const x = xScale(new Date(d.start));
            const y = d.line * lineHeight;
            return "translate(" + x + "," + y + ")";
          })
          .call(dragObject);

        objectsEnter
          .append("rect")
          .attr("class", "structure")
          .attr("x", 0)
          .attr("y", linePadding)
          .attr("rx", objectBarRoundedCorner)
          .attr("ry", objectBarRoundedCorner)
          .attr(
            "width",
            d => xScale(new Date(d.finish)) - xScale(new Date(d.start))
          )
          .attr("height", objectBarHeight)
          .attr("fill", "white");

        objectsEnter
          .append("rect")
          .attr("class", "duration")
          .attr("x", 0)
          .attr("y", linePadding)
          .attr("rx", objectBarRoundedCorner)
          .attr("ry", objectBarRoundedCorner)
          .attr(
            "width",
            d => xScale(new Date(d.finish)) - xScale(new Date(d.start))
          )
          .attr("height", objectBarHeight)
          .attr("fill", d => d.color)
          .attr("fill-opacity", "25%")
          .call(getBB);

        objectsEnter
          .append("rect")
          .attr("class", "completed")
          .attr("x", 0)
          .attr("y", linePadding)
          .attr("rx", objectBarRoundedCorner)
          .attr("ry", objectBarRoundedCorner)
          .attr("width", 0)
          .attr("height", objectBarHeight)
          .attr("fill", d => d.color);

        objectsEnter
          .append("rect")
          .attr("class", "resize right")
          .attr(
            "x",
            d => xScale(new Date(d.finish)) - xScale(new Date(d.start)) - 8
          )
          .attr("y", linePadding + 4)
          .attr("rx", 2)
          .attr("ry", 2)
          .attr("width", 4)
          .attr("height", objectBarHeight - 8)
          .attr("fill", "white")
          .call(resizeObject);

        objectsEnter
          .append("text")
          .attr("class", "name")
          .attr("y", linePadding + objectBarHeight / 2)
          .attr("x", 14)
          .text(d => d.name);

        objectsEnter.append("g").attr("class", "object-metrics");

        const objectsUpdate = objectsEnter.merge(objects);

        objectsUpdate
          .transition()
          .duration(duration)
          .attr("transform", d => {
            const x = xScale(new Date(d.start));
            const y = d.line * lineHeight;
            return "translate(" + x + "," + y + ")";
          });
        objectsUpdate
          .selectAll("rect.duration")
          .transition()
          .duration(duration)
          .attr(
            "width",
            d => xScale(new Date(d.finish)) - xScale(new Date(d.start))
          );
        objectsUpdate
          .selectAll("rect.completed")
          .transition()
          .duration(duration)
          .attr(
            "width",
            d =>
              (xScale(new Date(d.finish)) - xScale(new Date(d.start))) *
              (d.complete / 100)
          );
        objectsUpdate
          .selectAll("rect.structure")
          .transition()
          .duration(duration)
          .attr(
            "width",
            d => xScale(new Date(d.finish)) - xScale(new Date(d.start))
          );

        objectsUpdate
          .selectAll("rect.right")
          .transition()
          .duration(duration)
          .attr(
            "x",
            d => xScale(new Date(d.finish)) - xScale(new Date(d.start)) - 8
          );

        objectsUpdate
          .select(".object-metrics")
          .call(renderMetrics)
          .attr(
            "transform",
            "translate(24, " +
              (objectBarHeight + objectBarMetricSpace + linePadding) +
              ")"
          );
      });
    }

    function renderMetrics(selection) {
      selection.each(function(d) {
        const metrics = localD3
          .select(this)
          .selectAll(".metric")
          .data(d.metrics);

        const metricsEnter = metrics
          .enter()
          .append("g")
          .attr("class", "metric")
          .attr("transform", (d, i) => {
            if (localD3.select(this).classed("metrics-vertical")) {
              return (
                "translate(0, " + (metricHeight * i + metricSpace * i) + ")"
              );
            } else {
              return (
                "translate(" + (metricWidth * i + metricSpace * i) + ", 0)"
              );
            }
          });

        metricsEnter
          .append("rect")
          .attr("x", -10)
          .attr("y", 0)
          .attr("rx", 6)
          .attr("ry", 6)
          .attr("width", metricWidth)
          .attr("height", metricHeight)
          .attr("fill", "#d1d1d1");

        metricsEnter
          .append("text")
          .attr("fill", "#545454")
          .style("font-size", "11px")
          .attr("text-anchor", "middle")
          .attr("x", 12)
          .attr("y", 12)
          .text(d => numberFormatter(d.actual, 1, d.type));
      });
    }

    function renderLaneMilestonesLines(selection) {
      selection.each(function(d) {
        let laneHeight;
        if (localD3.select(this).classed("sub-lane-milestones")) {
          laneHeight = lineHeight * 2 * d.sub_lanes.length + 32;
        } else {
          const totalLines = localD3.max(d.objects, d => d.line) + 1;
          laneHeight = totalLines * lineHeight + 32;
        }

        const lines = localD3
          .select(this)
          .selectAll("line")
          .data(data.milestones, d => d.id);

        lines
          .exit()
          .transition()
          .duration(duration)
          .style("opacity", 0)
          .remove();

        const linesEnter = lines
          .enter()
          .append("line")
          .attr("x1", d => xScale(new Date(d.start)))
          .attr("y1", 0)
          .attr("x2", d => xScale(new Date(d.start)))
          .attr("y2", laneHeight)
          //.style('stroke', '#CBCBCB')
          .style("stroke", (d, i) => localD3.schemeTableau10[(i % 2) + 2]);

        const linesUpdate = linesEnter.merge(lines);

        linesUpdate
          .transition()
          .duration(duration)
          .attr("x1", d => xScale(new Date(d.start)))
          .attr("x2", d => xScale(new Date(d.start)))
          .attr("y2", laneHeight);
      });
    }

    function renderLaneMetrics(selection) {
      selection.each(function(d) {
        var metrics = localD3
          .select(this)
          .select("div")
          .selectAll(".metric")
          .data(d.metrics);

        metrics.exit().remove();

        var metricsEnter = metrics
          .enter()
          .append("div")
          .attr("class", "metric");

        metricsEnter
          .append("span")
          .attr("class", "metric-span metric-title")
          .text(d => d.name);

        metricsEnter
          .append("span")
          .attr("class", "metric-span")
          .text("Target:");

        metricsEnter
          .append("span")
          .attr("class", "metric-target")
          .text(d => numberFormatter(d.target, 1, d.type));

        metricsEnter
          .append("span")
          .attr("class", "metric-span")
          .text("Actual:");

        metricsEnter
          .append("span")
          .attr("class", "metric-actual")
          .text(d => numberFormatter(d.actual, 1, d.type));

        metricsEnter
          .append("svg")
          .attr("width", 20)
          .attr("height", 14)
          .attr("transform", "translate(0,2)")
          .append("g")
          .attr("class", "metric-donut")
          .attr("transform", "translate(7,7)");

        var metricsUpdate = metricsEnter.merge(metrics);
        metricsUpdate
          .select(".metric-target")
          .text(d => numberFormatter(d.target, 1, d.type));

        metricsUpdate
          .select(".metric-actual")
          .text(d => numberFormatter(d.actual, 1, d.type));

        metricsUpdate.select(".metric-donut").call(renderMetricDonut);
      });
    }

    function renderMetricDonut(selection) {
      selection.each(function(d) {
        let donutData = [
          { startAngle: 0, endAngle: 0, color: "#65E3A0" },
          { startAngle: 0, endAngle: Math.PI * 2, color: "#A5A5A5" }
        ];

        if (d.actual > d.target) {
          donutData[0].endAngle = Math.PI * 2;
          donutData[1].startAngle = Math.PI * 2;
          if (!d.goal) {
            donutData[0].color = "#E65C67";
          }
        }

        if (d.actual <= d.target) {
          let angle = (((d.actual / d.target) * 360) / 180) * Math.PI;
          donutData[0].endAngle = angle;
          donutData[1].startAngle = angle;
          if (d.goal) {
            donutData[0].color = "#E65C67";
          }
        }
        localD3
          .select(this)
          .selectAll(".donut-arc")
          .data(donutData)
          .enter()
          .append("path")
          .attr("class", "donut-arc")
          .attr(
            "d",
            localD3
              .arc()
              .innerRadius(3)
              .outerRadius(7)
          )
          .attr("fill", d => d.color);
      });
    }

    // Update on horizontal scroll
    localD3.select(window).on("scroll.scroller", position);

    function position() {
      gMilestone.attr(
        "transform",
        "translate(" + (paddingLeft - window.pageXOffset) + ",5)"
      );
      gAxis.attr(
        "transform",
        "translate(" + (paddingLeft - window.pageXOffset) + "," + xAxisTop + ")"
      );
    }

    updateScale();

    var format = localD3.timeFormat("%Y-%m-%d");

    function objectResized(d) {
      var point = localD3.mouse(this.parentNode.parentNode),
        p = { x: point[0], y: point[1] };

      let mouseX = p.x;
      if (mouseX < 1) {
        mouseX = 1;
      } else if (mouseX > scaleRangeMax) {
        mouseX = scaleRangeMax + 1;
      }
      d.finish = format(xScale.invert(mouseX));

      localD3
        .select(this)
        .attr(
          "x",
          d => xScale(new Date(d.finish)) - xScale(new Date(d.start)) - 8
        );
      localD3
        .select(this.parentNode)
        .select(".duration")
        .attr(
          "width",
          d => xScale(new Date(d.finish)) - xScale(new Date(d.start))
        );
    }

    function objectResizeended() {
      renderLaneWithSubLane();
    }

    function objectDragstarted(d) {
      d.delta = xScale(new Date(d.start)) - localD3.event.x;
    }

    function objectDragged() {
      localD3
        .select(this)
        .raise()
        .attr("transform", d => {
          let mouseX = localD3.event.x + d.delta;
          if (mouseX < 1) {
            mouseX = 1;
          } else if (mouseX > scaleRangeMax) {
            mouseX = scaleRangeMax + 1;
          }
          d.start = format(xScale.invert(mouseX));

          const x = xScale(new Date(d.start));
          const y = d.line * lineHeight;

          d.x = x;
          return "translate(" + x + "," + y + ")";
        });
    }

    function objectDragended() {}

    function milestoneDragstarted() {}

    function milestoneDragged() {
      localD3
        .select(this)
        .raise()
        .attr("transform", d => {
          let mouseX = localD3.event.x;
          if (mouseX < 1) {
            mouseX = 1;
          } else if (mouseX > scaleRangeMax) {
            mouseX = scaleRangeMax + 1;
          }
          d.start = format(xScale.invert(mouseX));
          localD3
            .select(this)
            .select("tspan.milestone-date")
            .text(d.start);
          const x = xScale(new Date(d.start));
          d.line = roundLine(
            localD3.event.y,
            milestoneLineHeight,
            milestoneMaxLines
          );

          const maxline = localD3.max(data.milestones, d => d.line);

          localD3
            .select("#timeline-lanes")
            .style(
              "margin-top",
              87 + milestoneLineHeight * (maxline + 1) + "px"
            );
          /*           const milestoneSVGHeight =
            milestoneLineHeight * (maxline + 1) <= 0
              ? milestoneLineHeight
              : milestoneLineHeight * (maxline + 1); */
          localD3
            .select("#timeline-milestone svg")
            .attr("height", milestoneLineHeight * (maxline + 1));
          return "translate(" + x + "," + milestoneLineHeight * d.line + ")";
        })
        .call(updateMilestoneTextPosition);
    }

    function milestoneDragended() {
      localD3.selectAll(".sub-lane-milestones").call(renderLaneMilestonesLines);
      localD3.selectAll(".lane-milestones").call(renderLaneMilestonesLines);
    }

    function clearSelection() {
      localD3.selectAll(".selected").classed("selected", false);
    }
    // Click functions

    function selectMilestone() {
      const state = !localD3.select(this).classed("selected");
      clearSelection();
      localD3.select(this).classed("selected", state);
    }

    function addMilestone() {
      const y = localD3.event.y - 87;
      const adjustedX = localD3.event.x - paddingLeft - 10 + window.pageXOffset;
      let x = adjustedX < 1 ? 1 : adjustedX;
      x = x >= scaleRangeMax ? scaleRangeMax + 1 : x;
      const startDate = format(xScale.invert(x));
      const m = {
        id: new Date().getTime(),
        name: "New Milestone",
        start: startDate,
        line: roundLine(y, milestoneLineHeight, milestoneMaxLines)
      };
      //console.log(m);
      data.milestones.push(m);
      renderMilestone();
      localD3.selectAll(".sub-lane-milestones").call(renderLaneMilestonesLines);
      localD3.selectAll(".lane-milestones").call(renderLaneMilestonesLines);
    }

    // remove unecessary svg created to be able to get the correct body 100% width
    localD3.select("#timeline-lanes svg").remove();

    // keyboard key pressed
    document.onkeydown = function(e) {
      if (e.keyCode === 27) {
        //escape
        clearSelection();
      }
      if (e.keyCode === 46) {
        //delete
        //console.log("delete");
        localD3.selectAll(".selected").call(removeItens);
      }
    };

    function removeItens(selection) {
      selection.each(function(d) {
        const item = localD3.select(this);
        if (item.classed("milestone")) {
          data.milestones.splice(data.milestones.indexOf(d), 1);
          renderMilestone();
          localD3
            .selectAll(".sub-lane-milestones")
            .call(renderLaneMilestonesLines);
          localD3.selectAll(".lane-milestones").call(renderLaneMilestonesLines);
        }
      });
    }

    //Util
    function getBB(selection) {
      selection.each(function(d) {
        d.bbox = this.getBBox();
      });
    }

    function roundLine(p, h, l) {
      const max = h * l;
      if (p < 0) {
        return 0;
      }
      return p >= max ? max / h - 1 : Math.ceil(p / h) - 1;
    }
    function numberFormatter(num, digits, type) {
      if (type === "percentage") {
        return num + "%";
      }
      var si = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" }
      ];
      var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
      var i;
      for (i = si.length - 1; i > 0; i--) {
        if (num >= si[i].value) {
          break;
        }
      }
      return (
        (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol
      );
    }
  }
};
</script>

<style lang="scss">
#timeline {
  width: 100%;
  font-family: Roboto !important;
}
#fixed {
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0px;
  background: white;
}
#timeline-scale {
  margin: 10px 10px 0px 10px;
  border-radius: 10px;
  background: #ededed;
}
#xAxis line,
#xAxis path {
  stroke: #7c7c7c;
}
#xAxis text {
  fill: #656565;
  font-size: 11px;
}
#timeline-legend {
  height: 22px;
}
#timeline-milestone {
  margin: 0px 10px 0px 10px;
  background: white;
}
.lane {
  margin: 0px 10px 0px 10px;
}
.lane-header .title {
  fill: white;
  font-size: 12px;
  font-weight: bold;
}
.lane-header .metric {
  display: inline-flex;
  margin-left: 20px;
  background-color: #ededed;
  border-radius: 6px 6px 6px 6px;
}
.lane-header .metric-span {
  color: #a6a6a6;
  font-size: 11px;
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  padding: 0px 0px 0px 8px;
}
.lane-header .metric-title {
  color: #656565;
  border-right: 2px solid #b7b7b7;
  padding: 0px 8px 0px 8px;
}
.lane-header .metric-actual,
.lane-header .metric-target {
  color: #656565;
  font-size: 11px;
  min-height: 18px;
  display: inline-flex;
  align-items: center;
  padding: 0px 8px 0px 8px;
}
.lane-object .name {
  fill: #303030;
  font-size: 12px;
}
.sub-lane .title {
  color: #656565;
  font-size: 11px;
  text-align: center;
}
.sub-lane-metrics-labels text {
  fill: #656565;
  font-size: 11px;
  text-align: center;
}
.disabled {
  display: none;
}
#gMilestone .selected text {
  fill: #656565 !important;
}
.milestone {
  cursor: pointer;
}
.resize {
  cursor: col-resize;
}
</style>
