import { randomUUID } from 'crypto'
import { pool, query } from './db.mjs'

const PHC = 'Port Harcourt, Rivers State'

const jobs = [
  {
    title: 'Senior Electrical Engineer',
    department: 'Engineering',
    location: PHC,
    type: 'Full Time',
    posted_date: '2026-05-20',
    is_active: true,
    description: `<p>We are seeking an experienced Senior Electrical Engineer to lead the maintenance and optimisation of electrical systems across our gas-fired power plants. You will play a central role in ensuring the reliability and safety of our generation assets.</p>
<h3>Key Responsibilities</h3>
<ul>
<li>Oversee maintenance of generators, transformers, switchgear, and protection systems</li>
<li>Lead root-cause analysis of electrical faults and implement corrective actions</li>
<li>Manage planned outages and coordinate with the operations team</li>
<li>Mentor junior engineers and technicians</li>
</ul>`,
    requirements: `<ul>
<li>B.Eng/B.Sc in Electrical/Electronic Engineering</li>
<li>Minimum 7 years' experience in power generation or heavy industry</li>
<li>COREN registration is an advantage</li>
<li>Strong knowledge of HV/MV systems and protection schemes</li>
<li>Excellent analytical and leadership skills</li>
</ul>`,
  },
  {
    title: 'Turbine Maintenance Technician',
    department: 'Operations & Maintenance',
    location: PHC,
    type: 'Full Time',
    posted_date: '2026-05-12',
    is_active: true,
    description: `<p>Join our maintenance team to support the upkeep and overhaul of gas turbine units. You will carry out scheduled and corrective maintenance to keep our plants running at peak performance.</p>
<h3>Key Responsibilities</h3>
<ul>
<li>Perform routine inspections and preventive maintenance on turbine assemblies</li>
<li>Support major overhauls including hot-section component replacement</li>
<li>Document maintenance activities and update the CMMS</li>
<li>Adhere strictly to safety and isolation procedures</li>
</ul>`,
    requirements: `<ul>
<li>HND/OND in Mechanical Engineering or related trade</li>
<li>Minimum 4 years' hands-on turbine maintenance experience</li>
<li>Familiarity with GE or Siemens gas turbines preferred</li>
<li>Willingness to work shifts and during planned outages</li>
</ul>`,
  },
  {
    title: 'Control Room Operator',
    department: 'Operations',
    location: PHC,
    type: 'Full Time',
    posted_date: '2026-05-05',
    is_active: true,
    description: `<p>We are looking for vigilant Control Room Operators to monitor and control plant operations from our central control room, ensuring safe, stable, and efficient generation around the clock.</p>
<h3>Key Responsibilities</h3>
<ul>
<li>Monitor plant parameters via the DCS and respond to alarms</li>
<li>Start up, shut down, and synchronise generating units to the grid</li>
<li>Coordinate field operations and maintain accurate logs</li>
<li>Escalate abnormal conditions per established procedures</li>
</ul>`,
    requirements: `<ul>
<li>HND/B.Eng in Electrical, Mechanical, or Instrumentation Engineering</li>
<li>Minimum 3 years' experience operating a power plant or process facility</li>
<li>Comfortable working a rotating shift pattern</li>
<li>Calm under pressure with strong attention to detail</li>
</ul>`,
  },
  {
    title: 'HSE Officer',
    department: 'Health, Safety & Environment',
    location: PHC,
    type: 'Full Time',
    posted_date: '2026-04-28',
    is_active: true,
    description: `<p>Support our commitment to a zero-incident workplace. As an HSE Officer you will promote a strong safety culture and ensure compliance with regulatory and company standards across all sites.</p>
<h3>Key Responsibilities</h3>
<ul>
<li>Conduct risk assessments, audits, and safety inspections</li>
<li>Deliver toolbox talks and HSE inductions for staff and contractors</li>
<li>Investigate incidents and track corrective actions to closure</li>
<li>Maintain HSE records and prepare statutory reports</li>
</ul>`,
    requirements: `<ul>
<li>B.Sc in any discipline with a recognised HSE certification (NEBOSH/ISPON)</li>
<li>Minimum 4 years' HSE experience in an industrial environment</li>
<li>Sound knowledge of Nigerian HSE regulations</li>
<li>Strong communication and reporting skills</li>
</ul>`,
  },
  {
    title: 'Procurement Officer',
    department: 'Supply Chain',
    location: PHC,
    type: 'Full Time',
    posted_date: '2026-04-15',
    is_active: true,
    description: `<p>Manage the sourcing and purchasing of goods and services that keep our operations running. You will work with vendors and internal teams to secure the best value while upholding our local content commitments.</p>
<h3>Key Responsibilities</h3>
<ul>
<li>Process purchase requisitions and issue purchase orders</li>
<li>Evaluate and qualify suppliers, negotiate pricing and terms</li>
<li>Track deliveries and resolve supply discrepancies</li>
<li>Maintain accurate procurement records and reports</li>
</ul>`,
    requirements: `<ul>
<li>B.Sc in Supply Chain, Business, or a related field</li>
<li>Minimum 3 years' procurement experience, ideally in energy or industry</li>
<li>CIPS certification is an advantage</li>
<li>Strong negotiation and ERP/spreadsheet skills</li>
</ul>`,
  },
  {
    title: 'Instrumentation & Controls Engineer',
    department: 'Engineering',
    location: PHC,
    type: 'Contract',
    posted_date: '2026-04-02',
    is_active: true,
    description: `<p>We require an Instrumentation & Controls Engineer on a fixed-term contract to support a DCS upgrade and instrumentation reliability programme across our plants.</p>
<h3>Key Responsibilities</h3>
<ul>
<li>Calibrate, configure, and troubleshoot field instrumentation</li>
<li>Support DCS/PLC configuration and loop checks</li>
<li>Maintain control system documentation and as-built records</li>
<li>Work with operations to minimise instrument-related trips</li>
</ul>`,
    requirements: `<ul>
<li>B.Eng in Instrumentation, Electrical, or Control Engineering</li>
<li>Minimum 5 years' experience with industrial control systems</li>
<li>Hands-on experience with a major DCS platform</li>
<li>Available for a 12-month contract engagement</li>
</ul>`,
  },
  {
    title: 'Graduate Engineer Trainee',
    department: 'Engineering',
    location: PHC,
    type: 'Internship',
    posted_date: '2026-03-18',
    is_active: true,
    description: `<p>Kick-start your engineering career with FIPL's Graduate Trainee Programme. Over 12 months you will rotate through operations, maintenance, and engineering, gaining hands-on experience in power generation under the guidance of senior engineers.</p>
<h3>What You'll Gain</h3>
<ul>
<li>Structured rotations across core technical departments</li>
<li>Mentorship from experienced professionals</li>
<li>Exposure to real plant operations and projects</li>
</ul>`,
    requirements: `<ul>
<li>B.Eng/B.Sc (minimum Second Class Upper) in an engineering discipline</li>
<li>Graduated within the last two years</li>
<li>Completed or exempt from NYSC</li>
<li>Strong willingness to learn and a collaborative attitude</li>
</ul>`,
  },
  {
    title: 'Finance Analyst',
    department: 'Finance',
    location: PHC,
    type: 'Full Time',
    posted_date: '2026-02-10',
    is_active: false,
    description: `<p>Support financial planning, reporting, and analysis to drive sound business decisions. This role partners with operations to track costs, forecast performance, and ensure financial control.</p>
<h3>Key Responsibilities</h3>
<ul>
<li>Prepare monthly management accounts and variance analysis</li>
<li>Support budgeting and forecasting cycles</li>
<li>Analyse generation revenue and operating costs</li>
<li>Assist with audits and regulatory reporting</li>
</ul>`,
    requirements: `<ul>
<li>B.Sc in Accounting, Finance, or Economics</li>
<li>ICAN/ACCA part-qualification or higher</li>
<li>Minimum 3 years' experience in financial analysis</li>
<li>Advanced Excel and strong attention to detail</li>
</ul>`,
  },
]

const existing = await query('select title from jobs')
const existingTitles = new Set(existing.map((r) => r.title))
const toInsert = jobs.filter((j) => !existingTitles.has(j.title))

if (toInsert.length === 0) {
  console.log('All jobs already exist — nothing to insert.')
  await pool.end()
  process.exit(0)
}

console.log(`Inserting ${toInsert.length} job(s)…`)

for (const j of toInsert) {
  await query(
    `insert into jobs
      (id, title, department, location, type, description, requirements, posted_date, is_active)
     values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      randomUUID(),
      j.title,
      j.department,
      j.location,
      j.type,
      j.description,
      j.requirements,
      j.posted_date,
      j.is_active,
    ],
  )
}

console.log(`\nDone — ${toInsert.length} job(s) inserted:\n`)
toInsert.forEach((j) => console.log(`  ✓ [${j.type}${j.is_active ? '' : ', closed'}] ${j.title}`))

await pool.end()
