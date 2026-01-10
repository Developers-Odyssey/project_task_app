// Auth Check
if (localStorage.getItem('isAuthenticated') !== 'true') {
    window.location.replace('login.html');
}

// Theme Logic
const themeToggle = document.getElementById('theme-toggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
root.setAttribute('data-theme', savedTheme);

// Logout Handler
const logoutBtn = document.querySelector('a[href="login.html"]');
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('isAuthenticated');
        window.location.href = 'login.html';
    });
}


themeToggle.addEventListener('click', () => {
    const currentTheme = root.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Issue Tracker Logic

// Initialize issues from localstorage or empty array
function getIssues() {
    const issues = localStorage.getItem('issues');
    if (!issues) return [];
    try {
        return JSON.parse(issues);
    } catch (e) {
        console.error("Error parsing issues:", e);
        return [];
    }
}

function saveIssues(issues) {
    localStorage.setItem('issues', JSON.stringify(issues));
    renderIssues();
}

// Global form handler
document.getElementById('issueInputForm').addEventListener('submit', (e) => {
    e.preventDefault();
    submitIssue('Open');
});

function getInputValue(id) {
    return document.getElementById(id).value;
}

function validateInput(description, assignedTo) {
    if (!description || description.trim().length === 0) {
        showToast("Please enter a description.");
        return false;
    }
    if (!assignedTo || assignedTo.trim().length === 0) {
        showToast("Please assign this issue to someone.");
        return false;
    }
    return true;
}

function submitIssue(status = 'Open') {
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Date.now().toString(); // Use timestamp as ID for uniqueness

    if (!validateInput(description, assignedTo)) return;

    const newIssue = {
        id,
        description,
        severity,
        assignedTo,
        status,
        createdAt: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
    };

    const issues = getIssues();
    issues.push(newIssue);
    saveIssues(issues);

    document.getElementById('issueInputForm').reset();
    showToast(`Issue added successfully as ${status}!`);
}

// Wrapper for buttons outside the main submit flow
function addQuickIssue(status) {
    submitIssue(status);
}

function closeIssue(id) {
    const issues = getIssues();
    const issueIndex = issues.findIndex(issue => issue.id == id);
    if (issueIndex > -1) {
        issues[issueIndex].status = 'Closed';
        saveIssues(issues);
        showToast("Issue marker as closed.");
    }
}

function deleteIssue(id) {
    const issues = getIssues();
    const remainingIssues = issues.filter(issue => issue.id != id);
    saveIssues(remainingIssues);
    showToast("Issue deleted.");
}

function renderIssues() {
    const issues = getIssues();
    const issuesList = document.getElementById('issuesList');
    const totalCount = document.getElementById('total-count');

    issuesList.innerHTML = '';
    totalCount.textContent = `${issues.length} Issues`;

    // Sort by newest first
    issues.reverse().forEach(issue => {
        const { id, description, severity, assignedTo, status, createdAt } = issue;

        // Determine status class
        const displayStatus = status || 'Open';

        // Render content
        const issueCard = document.createElement('div');
        issueCard.className = 'issue-card';

        // Add strike-through effect for closed issues style logic if needed, 
        // but aesthetic requirements favor opacity/badges over <strike> tags usually.
        // We will keep text clean but use the status badge effectively.

        issueCard.innerHTML = `
            <div class="issue-header">
                <span class="issue-id">#${id.slice(-6)}</span>
                <span class="issue-status-badge status-${displayStatus}">${displayStatus}</span>
            </div>
            
            <div class="issue-desc">
                ${displayStatus === 'Closed' ? `<s style="opacity: 0.6">${description}</s>` : description}
            </div>
            
            <div class="issue-meta">
                <div class="meta-item">
                    <span class="severity-dot sev-${severity}"></span>
                    <span>${severity}</span>
                </div>
                <div class="meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    <span>${assignedTo}</span>
                </div>
                <div class="meta-item" title="${createdAt || 'Just now'}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    <span>${createdAt ? createdAt.split(' ')[0] : 'Today'}</span>
                </div>
            </div>

            <div class="issue-actions">
                ${displayStatus !== 'Closed' ? `<button onclick="closeIssue('${id}')" class="btn btn-issue-action-close">Close</button>` : ''}
                <button onclick="deleteIssue('${id}')" class="btn btn-issue-action-delete">Delete</button>
            </div>
        `;

        issuesList.appendChild(issueCard);
    });
}

// Toast System
function showToast(message) {
    const toast = document.getElementById('toast');
    const msg = document.getElementById('toast-message');
    msg.textContent = message;

    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// Initial Render
document.addEventListener('DOMContentLoaded', renderIssues);
