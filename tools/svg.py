import sys

ITEM_HEIGHT = 20
SPACING = 10
DELTA = ITEM_HEIGHT + SPACING
LABEL_WIDTH = 100

svg = """\
<svg xmlns="http://www.w3.org/2000/svg"
     viewBox="0 0 {0} {1}"
     width="{0}px"
     height="{1}px" >
{5}\
  <rect x="0" y="0" width="{0}" height="{1}" fill="hsla(0, 0%, 95%, 1)" />
{2}{3}{4}\
</svg>
"""

style = """\
  <style>
    svg {
      font: menu;
      font-size: 16px;
    }

    .bar rect {
      fill: hsl(30, 70%, 50%);
    }

    .line rect {
      fill: hsla(0, 0%, 0%, .2);
    }

    .line text {
      font-size: 11px;
    }
  </style>
"""



bar = """\
  <g class="bar" transform="translate(0, {{0}})">
    <text x="{2}" y="15" >{{1}}</text>
    <rect x="{0}" y="0" width="{{2}}" height="{1}" />
  </g>
""".format(LABEL_WIDTH + SPACING, ITEM_HEIGHT, SPACING)

line = """\
    <g class="line" transform="translate({{0}}, {0})">
      <rect x="0" y="0" width="1" height="{{1}}" />
      <text x="-5" y="{{2}}" >{{3}}</text>
    </g>
""".format(SPACING)

lines = """\
  <g transform="translate({0}, 0)">
{{0}}\
  </g>
""".format(LABEL_WIDTH + SPACING)

units = """\
  <g class="line">
    <text x="{0}" y="{1}" >{2}</text>
  </g>
"""



def get_max_width(m):
  for i in [5, 10, 50, 100, 500, 1000]:
    if m < i * 10:
      return i, (int(m / i) + 1) * i 

if __name__ == '__main__':
  # width, unit, (name, time)+
  width = int(sys.argv[1])
  column_unit = sys.argv[2]
  labels = sys.argv[3::2]
  values = sys.argv[4::2]
  max_val = max(map(lambda f: float(f), values))
  grid_size, max_width = get_max_width(max_val)
  scale = float(width - LABEL_WIDTH - SPACING) / (max_width + grid_size)
  values_scaled = map(lambda v: float(v) * scale, values)
  heights = range(SPACING * 2, len(labels) * DELTA + SPACING, DELTA)
  args = zip(heights, labels, values_scaled)
  bars = ''.join(map(lambda t: bar.format(*t), args))
  h = len(labels) * DELTA + SPACING
  grids = ''.join(map(lambda i: line.format(i * scale, h, h + 15, i), range(0, max_width + 1, grid_size)))
  height = h + SPACING + 25
  print svg.format(width, height, bars, lines.format(grids), units.format(width - 0.5 * (grid_size * scale), h + SPACING + 15, column_unit), '')
  
