export function Ticker() {
  const items = [
    'GAME RELEASE MANAGEMENT','PROVIDER INTEGRATION','AVAILABLE FOR SELECT PROJECTS',
    'WEBPAGE DESIGN','IT CONSULTATION','AI KNOWLEDGE AGENTS','AIRTABLE DB INTEGRATION',
    'VIBE CODING','CLAUDE CODE','ANTIGRAVITY IDE','CURSOR','SERVICENOW',
    'JIRA SERVICE DESK','AI WORKFLOW AUTOMATION','ACTIVE DIRECTORY','OFFICE 365',
    'CONTENT QA','SLA MANAGEMENT','RELIABLE RELEASE EXECUTION',
  ];
  const content = items.flatMap(t => [t, '✦']);
  const doubled = [...content, ...content];

  return (
    <div className="ticker" aria-hidden="true">
      <div className="ticker-track">
        <span>
          {doubled.map((item, i) =>
            item === '✦'
              ? <em key={i}>✦</em>
              : <span key={i}>{item}</span>
          )}
        </span>
      </div>
    </div>
  );
}
