/**
 * Retro travel poster-style hero illustrations for each airline.
 * Bold, flat, geometric SVG scenes inspired by vintage aviation posters.
 * Each airline gets a unique branded composition with shared visual elements.
 */

/* ─── Shared sub-components ─────────────────────────────────────────── */

const RetroPlane = ({
  fill = "white",
  accent,
  opacity = 0.2,
}: {
  fill?: string;
  accent?: string;
  opacity?: number;
}) => {
  const a = accent ?? fill;
  return (
    <g opacity={opacity}>
      {/* Fuselage */}
      <path
        d="M-80,0 C-75,-7 -60,-9 50,-9 C70,-8 90,-4 95,0 C90,4 70,8 50,9 C-60,9 -75,7 -80,0Z"
        fill={fill}
      />
      {/* Wings */}
      <path d="M-15,-9 L-45,-65 L15,-55 L30,-9Z" fill={a} />
      <path d="M-15,9 L-45,65 L15,55 L30,9Z" fill={a} />
      {/* Tail fin */}
      <path d="M-68,-9 L-90,-40 L-58,-30 L-55,-9Z" fill={a} />
      {/* Horizontal stabilizers */}
      <path d="M-62,-8 L-78,-22 L-52,-16 L-52,-8Z" fill={fill} opacity={0.7} />
      <path d="M-62,8 L-78,22 L-52,16 L-52,8Z" fill={fill} opacity={0.7} />
      {/* Engines */}
      <ellipse cx={-8} cy={-30} rx={12} ry={5} fill={fill} />
      <ellipse cx={-8} cy={30} rx={12} ry={5} fill={fill} />
    </g>
  );
};

const Cloud = ({
  x,
  y,
  scale = 1,
  opacity = 0.12,
}: {
  x: number;
  y: number;
  scale?: number;
  opacity?: number;
}) => (
  <g transform={`translate(${x},${y}) scale(${scale})`} opacity={opacity}>
    <ellipse cx={0} cy={0} rx={80} ry={30} fill="white" />
    <ellipse cx={-45} cy={-8} rx={55} ry={25} fill="white" />
    <ellipse cx={40} cy={-10} rx={60} ry={28} fill="white" />
    <ellipse cx={0} cy={-18} rx={40} ry={22} fill="white" />
  </g>
);

const Rays = ({
  cx,
  cy,
  count = 16,
  length = 900,
  startAngle = -90,
  spread = 180,
  opacity = 0.06,
}: {
  cx: number;
  cy: number;
  count?: number;
  length?: number;
  startAngle?: number;
  spread?: number;
  opacity?: number;
}) => (
  <g opacity={opacity}>
    {Array.from({ length: count }, (_, i) => {
      const angle = startAngle + (i * spread) / (count - 1);
      const rad = (angle * Math.PI) / 180;
      return (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={cx + Math.cos(rad) * length}
          y2={cy + Math.sin(rad) * length}
          stroke="white"
          strokeWidth="2"
        />
      );
    })}
  </g>
);

const Birds = ({
  x,
  y,
  opacity = 0.1,
}: {
  x: number;
  y: number;
  opacity?: number;
}) => (
  <g
    transform={`translate(${x},${y})`}
    opacity={opacity}
    fill="none"
    stroke="white"
    strokeWidth="1.5"
    strokeLinecap="round"
  >
    <path d="M0,0 Q4,-5 8,0" />
    <path d="M8,0 Q12,-5 16,0" />
    <path d="M25,12 Q28,9 31,12" />
    <path d="M31,12 Q34,9 37,12" />
    <path d="M12,-15 Q15,-19 18,-15" />
    <path d="M18,-15 Q21,-19 24,-15" />
  </g>
);

const RetroSun = ({
  cx,
  cy,
  r = 120,
  opacity = 0.15,
}: {
  cx: number;
  cy: number;
  r?: number;
  opacity?: number;
}) => (
  <g opacity={opacity}>
    <circle cx={cx} cy={cy} r={r} fill="hsl(35, 90%, 60%)" />
    <circle cx={cx} cy={cy} r={r * 0.78} fill="hsl(30, 85%, 62%)" />
    <circle cx={cx} cy={cy} r={r * 0.56} fill="hsl(25, 80%, 65%)" />
    <circle cx={cx} cy={cy} r={r * 0.33} fill="hsl(20, 75%, 68%)" />
  </g>
);

const Wrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <svg
      viewBox="0 0 1440 600"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
    >
      {children}
    </svg>
  </div>
);

/* ─── Southwest: "Heart of the Desert" ──────────────────────────────── */

export function SouthwestHeroIllustration() {
  return (
    <Wrapper>
      <RetroSun cx={1200} cy={120} r={130} opacity={0.14} />

      {/* Sunburst from bottom-left corner */}
      <Rays cx={0} cy={600} count={18} startAngle={-90} spread={90} opacity={0.1} />

      {/* Desert mesa landscape at bottom */}
      <path
        d="M0,600 L0,480 L100,480 L140,420 L240,420 L260,450 L360,450 L400,400
           L500,400 L520,440 L650,440 L700,390 L800,390 L830,420 L960,420
           L1000,380 L1100,380 L1140,430 L1250,430 L1300,400 L1380,400 L1440,450 L1440,600Z"
        fill="white"
        opacity={0.1}
      />
      {/* Second mesa layer */}
      <path
        d="M0,600 L0,510 L200,510 L250,470 L350,470 L380,500 L550,500
           L580,460 L680,460 L720,490 L900,490 L940,450 L1040,450
           L1080,480 L1200,480 L1260,460 L1350,460 L1440,490 L1440,600Z"
        fill="white"
        opacity={0.08}
      />

      {/* Clouds */}
      <Cloud x={180} y={280} scale={1.2} opacity={0.18} />
      <Cloud x={1100} y={180} scale={0.9} opacity={0.14} />
      <Cloud x={600} y={100} scale={0.6} opacity={0.1} />

      {/* Main plane - ascending from bottom-left to upper-right */}
      <g transform="translate(980, 180) rotate(-18) scale(2.8)">
        <RetroPlane fill="white" accent="hsl(44, 100%, 65%)" opacity={0.3} />
      </g>

      {/* Dotted circle decoration */}
      <circle
        cx={280}
        cy={200}
        r={70}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="5 5"
        opacity={0.14}
      />
      <circle cx={280} cy={200} r={58} fill="none" stroke="white" strokeWidth="1" opacity={0.08} />

      {/* Southwest heart */}
      <g transform="translate(245, 165) scale(2.2)" opacity={0.16}>
        <path
          d="M15,28 L0,12 A8,8,0,0,1,8,0 A8,8,0,0,1,15,6 A8,8,0,0,1,22,0 A8,8,0,0,1,30,12Z"
          fill="hsl(355, 86%, 57%)"
        />
      </g>

      {/* Birds */}
      <Birds x={820} y={90} opacity={0.16} />
      <Birds x={380} y={140} opacity={0.12} />
    </Wrapper>
  );
}

/* ─── Delta: "Art Deco Ascent" ──────────────────────────────────────── */

export function DeltaHeroIllustration() {
  return (
    <Wrapper>
      <RetroSun cx={720} cy={100} r={110} opacity={0.12} />

      {/* Art deco geometric rays from center-bottom */}
      <Rays cx={720} cy={650} count={24} startAngle={-110} spread={40} length={1000} opacity={0.09} />

      {/* Large Delta widget (triangle) */}
      <polygon
        points="720,80 920,500 520,500"
        fill="none"
        stroke="white"
        strokeWidth="3"
        opacity={0.12}
      />
      <polygon
        points="720,140 880,460 560,460"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity={0.08}
      />

      {/* Art deco horizontal lines */}
      <g opacity={0.08}>
        <line x1={100} y1={420} x2={520} y2={420} stroke="white" strokeWidth="1" />
        <line x1={100} y1={430} x2={480} y2={430} stroke="white" strokeWidth="1" />
        <line x1={100} y1={440} x2={440} y2={440} stroke="white" strokeWidth="1" />
        <line x1={920} y1={420} x2={1340} y2={420} stroke="white" strokeWidth="1" />
        <line x1={960} y1={430} x2={1340} y2={430} stroke="white" strokeWidth="1" />
        <line x1={1000} y1={440} x2={1340} y2={440} stroke="white" strokeWidth="1" />
      </g>

      {/* Clouds */}
      <Cloud x={200} y={300} scale={1.0} opacity={0.14} />
      <Cloud x={1200} y={220} scale={1.1} opacity={0.16} />
      <Cloud x={500} y={120} scale={0.5} opacity={0.1} />

      {/* Main plane - dramatic ascent */}
      <g transform="translate(1050, 160) rotate(-25) scale(3)">
        <RetroPlane fill="white" accent="hsl(351, 85%, 55%)" opacity={0.3} />
      </g>

      {/* Small secondary plane in distance */}
      <g transform="translate(300, 180) rotate(-10) scale(0.8)">
        <RetroPlane fill="white" opacity={0.1} />
      </g>

      {/* Decorative art deco circles */}
      <circle cx={160} cy={150} r={40} fill="none" stroke="white" strokeWidth="2" opacity={0.12} />
      <circle cx={160} cy={150} r={32} fill="none" stroke="white" strokeWidth="1" opacity={0.08} />
      <circle cx={160} cy={150} r={24} fill="none" stroke="white" strokeWidth="1" opacity={0.07} />

      {/* Birds */}
      <Birds x={870} y={80} opacity={0.14} />
    </Wrapper>
  );
}

/* ─── United: "Connecting the World" ────────────────────────────────── */

export function UnitedHeroIllustration() {
  return (
    <Wrapper>
      <RetroSun cx={1250} cy={100} r={120} opacity={0.13} />

      {/* Large globe */}
      <g opacity={0.12}>
        <circle cx={350} cy={320} r={220} fill="none" stroke="white" strokeWidth="2.5" />
        {/* Latitude lines */}
        <ellipse cx={350} cy={320} rx={220} ry={60} fill="none" stroke="white" strokeWidth="1.2" />
        <ellipse cx={350} cy={320} rx={220} ry={140} fill="none" stroke="white" strokeWidth="1.2" />
        {/* Longitude lines */}
        <ellipse cx={350} cy={320} rx={60} ry={220} fill="none" stroke="white" strokeWidth="1.2" />
        <ellipse cx={350} cy={320} rx={140} ry={220} fill="none" stroke="white" strokeWidth="1.2" />
        {/* Equator */}
        <line x1={130} y1={320} x2={570} y2={320} stroke="white" strokeWidth="1.2" />
        {/* Prime meridian */}
        <line x1={350} y1={100} x2={350} y2={540} stroke="white" strokeWidth="1.2" />
      </g>

      {/* Orbital arc around globe */}
      <path
        d="M200,100 Q600,200 900,80"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeDasharray="8 4"
        opacity={0.11}
      />

      {/* Clouds */}
      <Cloud x={900} y={350} scale={1.3} opacity={0.16} />
      <Cloud x={1200} y={180} scale={0.8} opacity={0.13} />
      <Cloud x={700} y={100} scale={0.5} opacity={0.1} />

      {/* Main plane - circling the globe */}
      <g transform="translate(1000, 190) rotate(-12) scale(2.8)">
        <RetroPlane fill="white" accent="hsl(207, 100%, 50%)" opacity={0.3} />
      </g>

      {/* Stars/constellation dots */}
      <g opacity={0.14} fill="white">
        <circle cx={800} cy={80} r={2.5} />
        <circle cx={850} cy={60} r={1.8} />
        <circle cx={830} cy={110} r={2} />
        <circle cx={780} cy={50} r={1.5} />
        <circle cx={870} cy={95} r={2.2} />
        <circle cx={1300} cy={150} r={2} />
        <circle cx={1330} cy={120} r={1.5} />
        <circle cx={1280} cy={130} r={2.5} />
      </g>

      {/* Dotted arc - flight path */}
      <path
        d="M350,100 Q700,50 1050,200"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="6 6"
        opacity={0.11}
      />

      {/* Birds */}
      <Birds x={1100} y={100} opacity={0.14} />
    </Wrapper>
  );
}

/* ─── American: "Stars & Stripes Sky" ───────────────────────────────── */

export function AmericanHeroIllustration() {
  return (
    <Wrapper>
      <RetroSun cx={200} cy={100} r={120} opacity={0.13} />

      {/* Rays from top-center */}
      <Rays cx={720} cy={-50} count={20} startAngle={60} spread={60} length={800} opacity={0.09} />

      {/* Horizontal stripes at bottom (patriotic hint) */}
      <g opacity={0.1}>
        <rect x={0} y={460} width={1440} height={8} fill="white" />
        <rect x={0} y={480} width={1440} height={8} fill="hsl(351, 85%, 55%)" />
        <rect x={0} y={500} width={1440} height={8} fill="white" />
        <rect x={0} y={520} width={1440} height={8} fill="hsl(351, 85%, 55%)" />
        <rect x={0} y={540} width={1440} height={8} fill="white" />
        <rect x={0} y={560} width={1440} height={8} fill="hsl(351, 85%, 55%)" />
      </g>

      {/* Stylized eagle wing silhouette */}
      <g transform="translate(200, 250)" opacity={0.11}>
        <path
          d="M0,0 Q40,-80 120,-120 Q160,-130 200,-110 Q180,-70 160,-40
             Q200,-60 260,-50 Q240,-20 200,10 Q250,0 300,20
             Q260,50 200,60 Q150,50 100,30 Q50,20 0,0Z"
          fill="white"
        />
      </g>

      {/* Stars */}
      <g opacity={0.14} fill="white">
        {[
          [180, 120], [220, 80], [260, 140], [150, 160], [300, 100],
          [1250, 140], [1300, 100], [1280, 170],
        ].map(([cx, cy], i) => (
          <polygon
            key={i}
            points={`${cx},${cy - 6} ${cx + 2},${cy - 2} ${cx + 6},${cy - 2} ${cx + 3},${cy + 1} ${cx + 4},${cy + 6} ${cx},${cy + 3} ${cx - 4},${cy + 6} ${cx - 3},${cy + 1} ${cx - 6},${cy - 2} ${cx - 2},${cy - 2}`}
          />
        ))}
      </g>

      {/* Clouds */}
      <Cloud x={300} y={320} scale={1.1} opacity={0.16} />
      <Cloud x={1100} y={280} scale={1.0} opacity={0.14} />
      <Cloud x={700} y={110} scale={0.6} opacity={0.1} />

      {/* Main plane - steep ascent */}
      <g transform="translate(1020, 170) rotate(-22) scale(2.8)">
        <RetroPlane fill="white" accent="hsl(351, 85%, 55%)" opacity={0.3} />
      </g>

      {/* Dotted circle frame */}
      <circle
        cx={200}
        cy={130}
        r={90}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 6"
        opacity={0.12}
      />

      {/* Birds */}
      <Birds x={850} y={80} opacity={0.14} />
      <Birds x={500} y={130} opacity={0.1} />
    </Wrapper>
  );
}

/* ─── JetBlue: "Above the Clouds" ──────────────────────────────────── */

export function JetBlueHeroIllustration() {
  return (
    <Wrapper>
      <RetroSun cx={1300} cy={-40} r={140} opacity={0.15} />

      {/* Sun rays from top-right */}
      <Rays cx={1300} cy={-80} count={14} startAngle={100} spread={80} length={900} opacity={0.1} />

      {/* Massive cloud bank at bottom - defining feature */}
      <g opacity={0.2}>
        <ellipse cx={300} cy={500} rx={250} ry={80} fill="white" />
        <ellipse cx={600} cy={510} rx={200} ry={70} fill="white" />
        <ellipse cx={900} cy={495} rx={230} ry={75} fill="white" />
        <ellipse cx={1200} cy={505} rx={220} ry={72} fill="white" />
        {/* Cloud tops */}
        <ellipse cx={200} cy={460} rx={120} ry={50} fill="white" />
        <ellipse cx={400} cy={450} rx={100} ry={45} fill="white" />
        <ellipse cx={580} cy={465} rx={90} ry={40} fill="white" />
        <ellipse cx={780} cy={445} rx={110} ry={48} fill="white" />
        <ellipse cx={1000} cy={455} rx={95} ry={42} fill="white" />
        <ellipse cx={1200} cy={460} rx={105} ry={45} fill="white" />
        <ellipse cx={1400} cy={470} rx={90} ry={40} fill="white" />
      </g>

      {/* Upper clouds */}
      <Cloud x={200} y={200} scale={1.0} opacity={0.14} />
      <Cloud x={1100} y={160} scale={0.7} opacity={0.12} />
      <Cloud x={600} y={120} scale={0.5} opacity={0.1} />

      {/* Main plane - emerging from clouds */}
      <g transform="translate(900, 220) rotate(-10) scale(3)">
        <RetroPlane fill="white" accent="hsl(39, 100%, 55%)" opacity={0.3} />
      </g>

      {/* Decorative dotted circles */}
      <circle
        cx={250}
        cy={280}
        r={55}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="4 4"
        opacity={0.14}
      />

      {/* Birds */}
      <Birds x={400} y={90} opacity={0.16} />
      <Birds x={750} y={70} opacity={0.12} />

      {/* Small accent plane in distance */}
      <g transform="translate(350, 160) rotate(-5) scale(0.7)">
        <RetroPlane fill="white" opacity={0.1} />
      </g>
    </Wrapper>
  );
}

/* ─── Atmos: "Where Mountains Meet the Sea" ─────────────────────────── */

export function AtmosHeroIllustration() {
  return (
    <Wrapper>
      <RetroSun cx={720} cy={80} r={130} opacity={0.14} />

      {/* Rays from center-top */}
      <Rays cx={720} cy={-100} count={20} startAngle={50} spread={80} length={900} opacity={0.09} />

      {/* Mountain range - left side (Alaska) */}
      <g opacity={0.15}>
        <path
          d="M0,600 L0,350 L60,280 L120,320 L180,240 L260,300 L320,220
             L400,280 L460,200 L520,270 L580,350 L620,400 L660,600Z"
          fill="white"
        />
        {/* Snow caps */}
        <path
          d="M180,240 L200,265 L160,265Z"
          fill="white"
          opacity={0.5}
        />
        <path
          d="M320,220 L345,250 L295,250Z"
          fill="white"
          opacity={0.5}
        />
        <path
          d="M460,200 L490,235 L430,235Z"
          fill="white"
          opacity={0.5}
        />
      </g>

      {/* Ocean waves - right side (Hawaii) */}
      <g opacity={0.12}>
        <path
          d="M780,600 L780,450
             Q830,430 880,450 Q930,470 980,450 Q1030,430 1080,450
             Q1130,470 1180,450 Q1230,430 1280,450 Q1330,470 1380,450
             Q1410,440 1440,450 L1440,600Z"
          fill="white"
        />
        {/* Second wave */}
        <path
          d="M780,600 L780,480
             Q820,465 860,480 Q900,495 940,480 Q980,465 1020,480
             Q1060,495 1100,480 Q1140,465 1180,480 Q1220,495 1260,480
             Q1300,465 1340,480 Q1380,495 1440,480 L1440,600Z"
          fill="white"
          opacity={0.6}
        />
      </g>

      {/* Tropical island hint */}
      <g transform="translate(1100, 400)" opacity={0.12}>
        {/* Small island mound */}
        <ellipse cx={0} cy={20} rx={60} ry={15} fill="white" />
        {/* Palm tree trunk */}
        <path d="M0,20 Q5,-10 -5,-40" fill="none" stroke="white" strokeWidth="3" />
        {/* Palm fronds */}
        <path d="M-5,-40 Q-40,-50 -50,-35" fill="none" stroke="white" strokeWidth="2" />
        <path d="M-5,-40 Q-30,-60 -45,-50" fill="none" stroke="white" strokeWidth="2" />
        <path d="M-5,-40 Q10,-65 30,-55" fill="none" stroke="white" strokeWidth="2" />
        <path d="M-5,-40 Q20,-50 40,-38" fill="none" stroke="white" strokeWidth="2" />
      </g>

      {/* Clouds */}
      <Cloud x={500} y={160} scale={0.9} opacity={0.14} />
      <Cloud x={900} y={120} scale={0.7} opacity={0.12} />
      <Cloud x={250} y={140} scale={0.5} opacity={0.1} />

      {/* Main plane - bridging mountains and ocean */}
      <g transform="translate(850, 190) rotate(-8) scale(2.8)">
        <RetroPlane fill="white" accent="hsl(97, 50%, 60%)" opacity={0.3} />
      </g>

      {/* Decorative circle */}
      <circle
        cx={720}
        cy={400}
        r={50}
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeDasharray="5 5"
        opacity={0.11}
      />

      {/* Birds */}
      <Birds x={600} y={80} opacity={0.14} />
      <Birds x={1000} y={60} opacity={0.12} />

      {/* Hawaiian flower hint */}
      <g transform="translate(1300, 160)" opacity={0.12}>
        {[0, 72, 144, 216, 288].map((angle) => (
          <ellipse
            key={angle}
            cx={0}
            cy={-12}
            rx={6}
            ry={12}
            fill="hsl(330, 70%, 65%)"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx={0} cy={0} r={5} fill="hsl(50, 90%, 65%)" />
      </g>
    </Wrapper>
  );
}
