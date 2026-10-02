// 🤡🤡🤡🤡🤡
// "/" focuses the search box, and an operator helper (fuzzy, Sublime Merge style) pops up
// while typing a search query. Operators come from config/search.php (user_action left out,
// it only applies to rules); labels from rule_trigger_*_choice in en_US. Format:
// [name, label, takes a value, alias of].
jQuery(function () {
    const operators = [
        ["account_id", "Either account ID is exactly", 1, ""],
        ["reconciled", "Transaction is reconciled", 0, ""],
        ["source_account_id", "Source account ID is exactly", 1, ""],
        ["destination_account_id", "Destination account ID is exactly", 1, ""],
        ["transaction_type", "Transaction is of type", 1, ""],
        ["type", "", 1, "transaction_type"],
        ["tag_is", "Any tag is", 1, ""],
        ["tag_is_not", "No tag is", 1, ""],
        ["tag", "", 1, "tag_is"],
        ["tag_contains", "Any tag contains", 1, ""],
        ["tag_ends", "Any tag ends with", 1, ""],
        ["tag_starts", "Any tag starts with", 1, ""],
        ["description_is", "Description is", 1, ""],
        ["description", "", 1, "description_is"],
        ["description_contains", "Description contains", 1, ""],
        ["description_ends", "Description ends with", 1, ""],
        ["description_starts", "Description starts with", 1, ""],
        ["notes_is", "Notes are", 1, ""],
        ["notes_are", "", 1, "notes_is"],
        ["notes_contains", "Notes contain", 1, ""],
        ["notes_contain", "", 1, "notes_contains"],
        ["notes", "", 1, "notes_contains"],
        ["notes_ends", "Notes end with", 1, ""],
        ["notes_end", "", 1, "notes_ends"],
        ["notes_starts", "Notes start with", 1, ""],
        ["notes_start", "", 1, "notes_starts"],
        ["source_account_is", "Source account name is", 1, ""],
        ["from_account_is", "", 1, "source_account_is"],
        ["source_account_contains", "Source account name contains", 1, ""],
        ["source", "", 1, "source_account_contains"],
        ["from", "", 1, "source_account_contains"],
        ["from_account_contains", "", 1, "source_account_contains"],
        ["source_account_ends", "Source account name ends with", 1, ""],
        ["from_account_ends", "", 1, "source_account_ends"],
        ["source_account_starts", "Source account name starts with", 1, ""],
        ["from_account_starts", "", 1, "source_account_starts"],
        ["source_account_nr_is", "Source account number / IBAN is", 1, ""],
        ["from_account_nr_is", "", 1, "source_account_nr_is"],
        ["source_account_nr_contains", "Source account number / IBAN contains", 1, ""],
        ["from_account_nr_contains", "", 1, "source_account_nr_contains"],
        ["source_account_nr_ends", "Source account number / IBAN ends with", 1, ""],
        ["from_account_nr_ends", "", 1, "source_account_nr_ends"],
        ["source_account_nr_starts", "Source account number / IBAN starts with", 1, ""],
        ["from_account_nr_starts", "", 1, "source_account_nr_starts"],
        ["destination_account_is", "Destination account name is", 1, ""],
        ["to_account_is", "", 1, "destination_account_is"],
        ["destination_account_contains", "Destination account name contains", 1, ""],
        ["destination", "", 1, "destination_account_contains"],
        ["to", "", 1, "destination_account_contains"],
        ["to_account_contains", "", 1, "destination_account_contains"],
        ["destination_account_ends", "Destination account name ends with", 1, ""],
        ["to_account_ends", "", 1, "destination_account_ends"],
        ["destination_account_starts", "Destination account name starts with", 1, ""],
        ["to_account_starts", "", 1, "destination_account_starts"],
        ["destination_account_nr_is", "Destination account number / IBAN is", 1, ""],
        ["to_account_nr_is", "", 1, "destination_account_nr_is"],
        ["destination_account_nr_contains", "Destination account number / IBAN contains", 1, ""],
        ["to_account_nr_contains", "", 1, "destination_account_nr_contains"],
        ["destination_account_nr_ends", "Destination account number / IBAN ends with", 1, ""],
        ["to_account_nr_ends", "", 1, "destination_account_nr_ends"],
        ["destination_account_nr_starts", "Destination account number / IBAN starts with", 1, ""],
        ["to_account_nr_starts", "", 1, "destination_account_nr_starts"],
        ["account_is", "Either account is exactly", 1, ""],
        ["account_contains", "Either account contains", 1, ""],
        ["account_ends", "Either account ends with", 1, ""],
        ["account_starts", "Either account starts with", 1, ""],
        ["account_nr_is", "Either account number / IBAN is", 1, ""],
        ["account_nr_contains", "Either account number / IBAN contains", 1, ""],
        ["account_nr_ends", "Either account number / IBAN ends with", 1, ""],
        ["account_nr_starts", "Either account number / IBAN starts with", 1, ""],
        ["category_is", "Category is", 1, ""],
        ["category_contains", "Category contains", 1, ""],
        ["category", "", 1, "category_contains"],
        ["category_ends", "Category ends with", 1, ""],
        ["category_starts", "Category starts with", 1, ""],
        ["budget_is", "Budget is", 1, ""],
        ["budget_contains", "Budget contains", 1, ""],
        ["budget", "", 1, "budget_contains"],
        ["budget_ends", "Budget ends with", 1, ""],
        ["budget_starts", "Budget starts with", 1, ""],
        ["bill_is", "Subscription is", 1, ""],
        ["bill_contains", "Subscription contains", 1, ""],
        ["bill", "", 1, "bill_contains"],
        ["bill_ends", "Subscription ends with", 1, ""],
        ["bill_starts", "Subscription starts with", 1, ""],
        ["subscription_is", "", 1, "bill_is"],
        ["subscription_contains", "", 1, "bill_contains"],
        ["subscription", "", 1, "bill_contains"],
        ["subscription_ends", "", 1, "bill_ends"],
        ["subscription_starts", "", 1, "bill_starts"],
        ["external_id_is", "External ID is", 1, ""],
        ["external_id_contains", "External ID contains", 1, ""],
        ["external_id", "", 1, "external_id_contains"],
        ["external_id_ends", "External ID ends with", 1, ""],
        ["external_id_starts", "External ID starts with", 1, ""],
        ["internal_reference_is", "Internal reference is", 1, ""],
        ["internal_reference_contains", "Internal reference contains", 1, ""],
        ["internal_reference", "", 1, "internal_reference_contains"],
        ["internal_reference_ends", "Internal reference ends with", 1, ""],
        ["internal_reference_starts", "Internal reference starts with", 1, ""],
        ["external_url_is", "External URL is", 1, ""],
        ["external_url_contains", "External URL contains", 1, ""],
        ["external_url", "", 1, "external_url_contains"],
        ["external_url_ends", "External URL ends with", 1, ""],
        ["external_url_starts", "External URL starts with", 1, ""],
        ["has_attachments", "Has any attachments", 0, ""],
        ["has_any_category", "Has a (any) category", 0, ""],
        ["has_any_budget", "Has a (any) budget", 0, ""],
        ["has_any_bill", "Has a (any) subscription", 0, ""],
        ["has_any_subscription", "", 0, "has_any_bill"],
        ["has_any_tag", "Has one or more (any) tags", 0, ""],
        ["any_notes", "Has (any) notes", 0, ""],
        ["has_any_notes", "", 0, "any_notes"],
        ["has_notes", "", 0, "any_notes"],
        ["any_external_url", "Has an (any) external URL", 0, ""],
        ["has_any_external_url", "", 0, "any_external_url"],
        ["has_no_attachments", "Has no attachments", 0, ""],
        ["has_no_category", "Has no category", 0, ""],
        ["has_no_budget", "Has no budget", 0, ""],
        ["has_no_bill", "Has no subscription", 0, ""],
        ["has_no_subscription", "", 0, "has_no_bill"],
        ["has_no_tag", "Has no tag(s)", 0, ""],
        ["no_notes", "Has no notes", 0, ""],
        ["no_external_url", "Has no external URL", 0, ""],
        ["source_is_cash", "Source account is (cash) account", 0, ""],
        ["destination_is_cash", "Destination account is (cash) account", 0, ""],
        ["account_is_cash", "Either account is cash", 0, ""],
        ["currency_is", "Transaction currency is", 1, ""],
        ["foreign_currency_is", "Transaction foreign currency is", 1, ""],
        ["id", "Transaction ID is", 1, ""],
        ["journal_id", "Transaction journal ID is", 1, ""],
        ["recurrence_id", "Recurring transaction ID is", 1, ""],
        ["date_on", "Transaction date is", 1, ""],
        ["date", "", 1, "date_on"],
        ["date_is", "", 1, "date_on"],
        ["on", "", 1, "date_on"],
        ["date_before", "Transaction date is before", 1, ""],
        ["before", "", 1, "date_before"],
        ["date_after", "Transaction date is after", 1, ""],
        ["after", "", 1, "date_after"],
        ["interest_date_on", "Interest date is on", 1, ""],
        ["interest_date", "", 1, "interest_date_on"],
        ["interest_date_is", "", 1, "interest_date_on"],
        ["interest_date_before", "Interest date is before", 1, ""],
        ["interest_date_after", "Interest date is after", 1, ""],
        ["book_date_on", "Book date is on", 1, ""],
        ["book_date", "", 1, "book_date_on"],
        ["book_date_is", "", 1, "book_date_on"],
        ["book_date_before", "Book date is before", 1, ""],
        ["book_date_after", "Book date is after", 1, ""],
        ["process_date_on", "Process date is on", 1, ""],
        ["process_date", "", 1, "process_date_on"],
        ["process_date_is", "", 1, "process_date_on"],
        ["process_date_before", "Process date is before", 1, ""],
        ["process_date_after", "Process date is after", 1, ""],
        ["due_date_on", "Due date is on", 1, ""],
        ["due_date", "", 1, "due_date_on"],
        ["due_date_is", "", 1, "due_date_on"],
        ["due_date_before", "Due date is before", 1, ""],
        ["due_date_after", "Due date is after", 1, ""],
        ["payment_date_on", "Payment date is on", 1, ""],
        ["payment_date", "", 1, "payment_date_on"],
        ["payment_date_is", "", 1, "payment_date_on"],
        ["payment_date_before", "Payment date is before", 1, ""],
        ["payment_date_after", "Payment date is after", 1, ""],
        ["invoice_date_on", "Invoice date is on", 1, ""],
        ["invoice_date", "", 1, "invoice_date_on"],
        ["invoice_date_is", "", 1, "invoice_date_on"],
        ["invoice_date_before", "Invoice date is before", 1, ""],
        ["invoice_date_after", "Invoice date is after", 1, ""],
        ["created_at_on", "Transaction was made on", 1, ""],
        ["created_at", "", 1, "created_at_on"],
        ["created_at_is", "", 1, "created_at_on"],
        ["created_at_before", "Transaction was created before", 1, ""],
        ["created_at_after", "Transaction was created after", 1, ""],
        ["updated_at_on", "Transaction was last edited on", 1, ""],
        ["updated_at", "", 1, "updated_at_on"],
        ["updated_at_is", "", 1, "updated_at_on"],
        ["updated_at_before", "Transaction was last updated before", 1, ""],
        ["updated_at_after", "Transaction was last updated after", 1, ""],
        ["created_on_on", "", 1, "created_at_on"],
        ["created_on", "", 1, "created_at"],
        ["created_on_before", "", 1, "created_at_before"],
        ["created_on_after", "", 1, "created_at_after"],
        ["updated_on_on", "", 1, "updated_at_on"],
        ["updated_on", "", 1, "updated_at"],
        ["updated_on_before", "", 1, "updated_at_before"],
        ["updated_on_after", "", 1, "updated_at_after"],
        ["amount_is", "Amount is", 1, ""],
        ["amount", "", 1, "amount_is"],
        ["amount_exactly", "", 1, "amount_is"],
        ["amount_less", "Amount is less than or equal to", 1, ""],
        ["amount_max", "", 1, "amount_less"],
        ["less", "", 1, "amount_less"],
        ["amount_more", "Amount is more than or equal to", 1, ""],
        ["amount_min", "", 1, "amount_more"],
        ["more", "", 1, "amount_more"],
        ["foreign_amount_is", "Foreign amount is exactly", 1, ""],
        ["foreign_amount", "", 1, "foreign_amount_is"],
        ["foreign_amount_less", "Foreign amount is less than", 1, ""],
        ["foreign_amount_max", "", 1, "foreign_amount_less"],
        ["foreign_amount_more", "Foreign amount is more than", 1, ""],
        ["foreign_amount_min", "", 1, "foreign_amount_more"],
        ["attachment_name_is", "Any attachment's name is", 1, ""],
        ["attachment", "", 1, "attachment_name_is"],
        ["attachment_is", "", 1, "attachment_name_is"],
        ["attachment_name", "", 1, "attachment_name_is"],
        ["attachment_name_contains", "Any attachment's name contains", 1, ""],
        ["attachment_name_starts", "Any attachment's name starts with", 1, ""],
        ["attachment_name_ends", "Any attachment's name ends with", 1, ""],
        ["attachment_notes", "", 1, "attachment_notes_are"],
        ["attachment_notes_are", "Any attachment's notes are", 1, ""],
        ["attachment_notes_contains", "Any attachment's notes contain", 1, ""],
        ["attachment_notes_contain", "", 1, "attachment_notes_contains"],
        ["attachment_notes_starts", "Any attachment's notes start with", 1, ""],
        ["attachment_notes_start", "", 1, "attachment_notes_starts"],
        ["attachment_notes_ends", "Any attachment's notes end with", 1, ""],
        ["attachment_notes_end", "", 1, "attachment_notes_ends"],
        ["exists", "Any transaction matches(!)", 0, ""],
        ["sepa_ct_is", "SEPA CT is", 1, ""],
        ["no_external_id", "Has no external ID", 0, ""],
        ["any_external_id", "Has an (any) external ID", 0, ""],
        ["has_any_external_id", "", 0, "any_external_id"],
        ["source_balance_gte", "Source account balance is more than or equal to", 1, ""],
        ["source_balance_gt", "Source account balance is more than", 1, ""],
        ["source_balance_lte", "Source account balance is less than or equal to", 1, ""],
        ["source_balance_lt", "Source account balance is less than", 1, ""],
        ["source_balance_is", "Source account balance is exactly", 1, ""],
        ["destination_balance_gte", "Destination account balance is more than or equal to", 1, ""],
        ["destination_balance_gt", "Destination account balance is more than", 1, ""],
        ["destination_balance_lte", "Destination account balance is less than or equal to", 1, ""],
        ["destination_balance_lt", "Destination account balance is less than", 1, ""],
        ["destination_balance_is", "Destination account balance is exactly", 1, ""],
    ];
    const maxResults = 10;
    const sidebarSelector = 'form.sidebar-form input[name="search"]';
    const inputs = `${sidebarSelector}, input#query`;

    // light-dark() follows the <meta name="color-scheme"> the layout sets from darkMode.
    jQuery('head').append(`<style id="ff-search-helper-style">
        .ff-search-helper { position: fixed; z-index: 2000; display: none; margin: 0; padding: 4px 0;
            list-style: none; font-size: 13px; border-radius: 3px;
            background: light-dark(#fff, #2c3b41); color: light-dark(#333, #ddd);
            border: 1px solid light-dark(rgba(0,0,0,.15), rgba(255,255,255,.12));
            box-shadow: 0 6px 12px rgba(0,0,0,.175); }
        .ff-search-helper li { display: flex; gap: 16px; justify-content: space-between;
            align-items: baseline; padding: 3px 10px; cursor: pointer; white-space: nowrap; }
        .ff-search-helper li.active { background: light-dark(#e8f0fe, #3c5a70); }
        .ff-search-helper .name { flex-shrink: 0; font-family: Menlo, Consolas, "DejaVu Sans Mono", monospace; }
        .ff-search-helper .name b { color: light-dark(#1a5fb4, #8cc4ff); }
        .ff-search-helper .label { min-width: 0; overflow: hidden; text-overflow: ellipsis;
            color: light-dark(#888, #9aa); font-size: 12px; }
    </style>`);
    const popup = jQuery('<ul class="ff-search-helper"></ul>').appendTo('body');
    let state = null; // {input, start, end, negated, matches, active}

    // Fuzzy subsequence match. Best alignment by DP: a letter scores more at the start of the
    // name or of a "_" segment, and more again when it follows the previous match (runs beat
    // scattered segment starts, so "desc" ranks description before destination_is_cash).
    function fuzzy(query, name) {
        const n = name.length, m = query.length;
        if (m > n) {
            return null;
        }
        const score = [], from = [];
        for (let i = 0; i < m; i++) {
            score.push(new Array(n).fill(-Infinity));
            from.push(new Array(n).fill(-1));
            for (let j = i; j < n; j++) {
                if (name[j] !== query[i]) {
                    continue;
                }
                const base = 1 + (0 === j ? 8 : ('_' === name[j - 1] ? 5 : 0));
                if (0 === i) {
                    score[i][j] = base;
                    continue;
                }
                for (let k = i - 1; k < j; k++) {
                    if (score[i - 1][k] === -Infinity) {
                        continue;
                    }
                    const s = score[i - 1][k] + base + (k === j - 1 ? 6 : 0);
                    if (s > score[i][j]) {
                        score[i][j] = s;
                        from[i][j] = k;
                    }
                }
            }
        }
        let best = -Infinity, end = -1;
        for (let j = 0; j < n; j++) {
            if (score[m - 1][j] > best) {
                best = score[m - 1][j];
                end = j;
            }
        }
        if (-1 === end) {
            return null;
        }
        const positions = [];
        for (let i = m - 1, j = end; i >= 0; j = from[i][j], i--) {
            positions.unshift(j);
        }
        return {score: best - n * 0.1 + (query === name ? 20 : 0), positions: positions};
    }

    // The token under the caret: from the last unquoted space up to the end of the word.
    function currentToken(input) {
        const value = input.value, caret = input.selectionStart;
        if (caret !== input.selectionEnd) {
            return null;
        }
        let start = 0, quoted = false;
        for (let i = 0; i < caret; i++) {
            if ('"' === value[i]) {
                quoted = !quoted;
            } else if (!quoted && /\s/.test(value[i])) {
                start = i + 1;
            }
        }
        if (quoted) {
            return null;
        }
        let end = caret;
        while (end < value.length && !/\s/.test(value[end])) {
            end++;
        }
        let word = value.slice(start, caret);
        const negated = word.startsWith('-');
        word = (negated ? word.slice(1) : word).toLowerCase();
        if ('' === word || /[:"]/.test(word)) {
            return null;
        }
        return {start: start, end: end, negated: negated, word: word};
    }

    function close() {
        popup.hide();
        state = null;
    }

    function render() {
        popup.empty();
        state.matches.forEach(function (match, index) {
            const op = match.op;
            const name = jQuery('<span class="name"></span>');
            for (let i = 0; i < op[0].length; i++) {
                name.append(match.positions.includes(i) ? jQuery('<b></b>').text(op[0][i]) : document.createTextNode(op[0][i]));
            }
            name.append(':');
            const label = jQuery('<span class="label"></span>').text(op[3] ? `→ ${op[3]}` : op[1]);
            jQuery('<li></li>').toggleClass('active', index === state.active).attr('data-index', index)
                .append(name, label).appendTo(popup);
        });
        place();
    }

    function place() {
        if (!state) {
            return;
        }
        // At least 340px wide (the sidebar is 230px), but never past the viewport on a phone.
        const rect = state.input.getBoundingClientRect();
        const viewport = document.documentElement.clientWidth; // without the scrollbar
        const width = Math.min(Math.max(rect.width, 340), viewport - 16);
        const left = Math.max(8, Math.min(rect.left, viewport - width - 8));
        popup.css({left: left, top: rect.bottom + 2, minWidth: width, maxWidth: viewport - 16}).show();
        const height = popup.outerHeight();
        if (rect.bottom + 2 + height > window.innerHeight && rect.top - 2 - height > 0) {
            popup.css({top: rect.top - 2 - height});
        }
    }

    function refresh(input) {
        const token = currentToken(input);
        if (!token) {
            close();
            return;
        }
        const matches = [];
        operators.forEach(function (op) {
            const match = fuzzy(token.word, op[0]);
            if (match) {
                matches.push({op: op, score: match.score, positions: match.positions});
            }
        });
        matches.sort((a, b) => b.score - a.score || a.op[0].length - b.op[0].length);
        if (0 === matches.length) {
            close();
            return;
        }
        state = Object.assign(token, {input: input, matches: matches.slice(0, maxResults), active: 0});
        render();
    }

    function accept(index) {
        const op = state.matches[index].op, input = state.input, value = input.value;
        const insert = (state.negated ? '-' : '') + op[0] + ':' + (op[2] ? '' : 'true ');
        input.value = value.slice(0, state.start) + insert + value.slice(state.end);
        const caret = state.start + insert.length;
        input.setSelectionRange(caret, caret);
        close();
    }

    jQuery('body').on('input', inputs, function () {
        refresh(this);
    });
    jQuery('body').on('keyup click', inputs, function (event) {
        if ('click' === event.type || ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
            refresh(this);
        }
    });
    jQuery('body').on('keydown', inputs, function (event) {
        if (!state || state.input !== this) {
            return;
        }
        const count = state.matches.length;
        switch (event.key) {
            case 'ArrowDown':
            case 'ArrowUp':
                state.active = (state.active + ('ArrowDown' === event.key ? 1 : count - 1)) % count;
                render();
                break;
            case 'Tab':
            case 'Enter':
                accept(state.active);
                break;
            case 'Escape':
                close();
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    });
    jQuery('body').on('blur', inputs, close);
    popup.on('mousedown', 'li', function (event) {
        event.preventDefault(); // keep focus in the input
        accept(parseInt(this.getAttribute('data-index')));
    });
    jQuery(window).on('resize', place);
    window.addEventListener('scroll', place, true);

    // "/" focuses #query on the search page with the caret at the end (to refine the query),
    // and the sidebar box anywhere else with its text selected (to start over). Desktop only: a
    // phone shows no keyboard until an input is already focused. A collapsed sidebar hides the
    // box (display:none), so it peeks open until blur without touching the saved collapsed state.
    jQuery(document).on('keydown', function (event) {
        if ('/' !== event.key || event.ctrlKey || event.altKey || event.metaKey) {
            return;
        }
        const active = document.activeElement;
        if (active && (active.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName))) {
            return;
        }
        const target = jQuery('input#query').get(0) || jQuery(sidebarSelector).get(0);
        if (!target) {
            return;
        }
        event.preventDefault();
        if (!target.offsetParent) {
            const body = jQuery('body').removeClass('sidebar-collapse');
            // Switching apps or tabs also blurs the box but keeps it as activeElement: only a
            // real move elsewhere closes the peek.
            const restore = () => setTimeout(function () {
                if (document.activeElement === target) {
                    jQuery(target).one('blur', restore);
                    return;
                }
                body.addClass('sidebar-collapse');
            }, 0);
            jQuery(target).one('blur', restore);
        }
        // Synchronously: the keys typed right after "/" must already land in the box.
        target.focus();
        if ('query' === target.id) {
            target.setSelectionRange(target.value.length, target.value.length);
        } else {
            target.select();
        }
    });
});
