document.addEventListener("DOMContentLoaded", function () {
  const data = {
    // nodes: ini kolom untuk tabel nama
    nodes: [
      { id: "Myriel", group: 1 },
      { id: "Napoleon", group: 1 },
      { id: "Champtercier", group: 1 },
      { id: "Cravatte", group: 1 },
      { id: "Mlle.Baptistine", group: 1 },
      { id: "Mme.Magloire", group: 1 },
      { id: "CountessdeLo", group: 1 },
    ],
    // links: nyambung darimana kemana, source to target
    links: [
      { source: "Napoleon", target: "Myriel", value: 1 },
      { source: "Mlle.Baptistine", target: "Myriel", value: 8 },
      { source: "Mme.Magloire", target: "Myriel", value: 10 },
      { source: "Mme.Magloire", target: "Mlle.Baptistine", value: 6 },
      { source: "CountessdeLo", target: "Myriel", value: 1 },
    ],
  };

  const svg = d3.select("#chart"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

  const simulation = d3
    .forceSimulation(data.nodes)
    .force(
      "link",
      d3.forceLink(data.links).id((d) => d.id)
    )
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

  const link = svg
    .append("g")
    .attr("class", "links")
    .selectAll("line")
    .data(data.links)
    .enter()
    .append("line")
    .attr("stroke-width", (d) => Math.sqrt(d.value));

  const node = svg.append("g").attr("class", "nodes").selectAll("circle").data(data.nodes).enter().append("circle").attr("r", 5).attr("fill", "steelblue").call(d3.drag().on("start", dragstarted).on("drag", dragged).on("end", dragended));

  node.append("title").text((d) => d.id);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);

    node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
  });

  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }

  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
});
