/* Local quick answers based only on information published on the site. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const widget = document.getElementById('studio-chat');
  if (!widget) return;

  const launch = widget.querySelector('.studio-chat-launch');
  const panel = widget.querySelector('.studio-chat-panel');
  const close = widget.querySelector('.studio-chat-close');
  const form = widget.querySelector('.studio-chat-form');
  const input = widget.querySelector('#studio-chat-input');
  const log = widget.querySelector('.studio-chat-messages');
  const prompts = widget.querySelector('.studio-chat-prompts');
  const email = 'studio@arqarquitectura.co.za';

  const openChat = () => {
    panel.hidden = false;
    launch.setAttribute('aria-expanded', 'true');
    input.focus();
  };
  const closeChat = () => {
    panel.hidden = true;
    launch.setAttribute('aria-expanded', 'false');
    launch.focus();
  };
  const addMessage = (text, kind) => {
    const message = document.createElement('p');
    message.className = `studio-chat-message is-${kind}`;
    message.textContent = text;
    log.appendChild(message);
    log.scrollTop = log.scrollHeight;
  };
  const answer = question => {
    const text = question.toLowerCase().replace(/[^a-z0-9\s-]/g, ' ').replace(/\s+/g, ' ').trim();
    if (/^(hi|hello|hey|good morning|good afternoon)$/.test(text)) {
      return 'Hello. What would you like to know about ARQ Arquitectura?';
    }
    if (/\b(email|contact|phone|telephone|number|reach|talk|speak|call)\b/.test(text)) {
      return `You can email the studio at ${email}. A phone number is not listed on this site.`;
    }
    if (/\b(where|located|location|based|address)\b/.test(text)) {
      return 'ARQ Arquitectura is based in Johannesburg, South Africa. The studio describes work across South Africa.';
    }
    if (/\b(process|steps|approach|how do you work|how does it work)\b/.test(text)) {
      return 'The studio process is Discover, Design, Develop and Deliver: understand the brief, explore ideas, resolve the design, then support delivery.';
    }
    if (/\b(cost|costs|price|pricing|budget|fee|fees|quote|rates)\b/.test(text)) {
      return `Pricing is not published here. Share your project type, location and brief with ${email} and the studio can respond with next steps.`;
    }
    if (/\b(timeline|duration|how long|when|schedule)\b/.test(text)) {
      return `Project timelines depend on the brief and are not listed on this site. Email ${email} with a few details for guidance.`;
    }
    if (/\b(service|services|design|offer|work do you|what do you do|interior|architecture|concept|delivery)\b/.test(text)) {
      return 'The studio lists architecture, interior spaces, concept design and project delivery. Its work includes homes and places of work.';
    }
    if (/\b(project|projects|portfolio|work|examples|case study)\b/.test(text)) {
      const current = document.querySelector('#project-detail-heading')?.textContent.trim();
      if (current && current !== 'Selected Project') return `You are viewing ${current}. Explore more work from the Projects link in the navigation.`;
      const names = [...document.querySelectorAll('.portfolio-featured-grid .portfolio-card')]
        .map(card => card.dataset.title).filter(Boolean).slice(0, 3);
      return names.length ? `Selected projects include ${names.join(', ')}. Browse the Projects section to see more.` : 'Browse the Projects section to explore the studio’s work.';
    }
    if (/\b(start|begin|brief|consult|appointment|hire|book)\b/.test(text)) {
      return `To start a conversation, email ${email} with your project type, location and a short description. You can also use the contact form on the studio page.`;
    }
    if (/\b(hours|opening|open|office)\b/.test(text)) {
      return `Studio hours are not listed on this site. Email ${email} to get in touch.`;
    }
    return `I don’t have that information yet. I can help with services, process, location, projects and contact details. For anything else, email ${email}.`;
  };
  const submitQuestion = value => {
    const question = value.trim();
    if (!question) return;
    addMessage(question, 'user');
    addMessage(answer(question), 'bot');
  };

  launch.addEventListener('click', () => panel.hidden ? openChat() : closeChat());
  close.addEventListener('click', closeChat);
  form.addEventListener('submit', event => {
    event.preventDefault();
    submitQuestion(input.value);
    input.value = '';
    input.focus();
  });
  prompts.addEventListener('click', event => {
    const prompt = event.target.closest('button');
    if (prompt) submitQuestion(prompt.textContent);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !panel.hidden) closeChat();
  });
});
