<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTicketRequest;
use App\Http\Requests\UpdateTicketRequest;
use App\Models\Ticket;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class TicketController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = array_merge(
            ['search' => '', 'status' => '', 'priority' => '', 'category' => ''],
            $request->only(['search', 'status', 'priority', 'category'])
        );

        $tickets = Ticket::query()
            ->where('user_id', $request->user()->id) // only the owner's tickets
            ->when($filters['search'], function ($q, $s) {
                $q->where('title', 'like', '%'.addcslashes($s, '%_\\').'%');
            })
            ->when(in_array($filters['status'], Ticket::STATUSES, true), fn ($q) => $q->where('status', $filters['status']))
            ->when(in_array($filters['priority'], Ticket::PRIORITIES, true), fn ($q) => $q->where('priority', $filters['priority']))
            ->when(in_array($filters['category'], Ticket::CATEGORIES, true), fn ($q) => $q->where('category', $filters['category']))
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $filters,
            'options' => Ticket::options(),
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Ticket::class);

        return Inertia::render('Tickets/Create', [
            'options' => Ticket::options(),
        ]);
    }

    public function store(StoreTicketRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['status'] ??= 'Open';

        $ticket = new Ticket($data);
        $ticket->user_id = auth()->id(); // never from the form
        $ticket->save();

        return redirect()->route('tickets.show', $ticket)->with('success', 'Ticket created.');
    }

    public function show(Ticket $ticket): Response
    {
        Gate::authorize('view', $ticket);

        return Inertia::render('Tickets/Show', [
            'ticket' => $ticket,
        ]);
    }

    public function edit(Ticket $ticket): Response
    {
        Gate::authorize('update', $ticket);

        return Inertia::render('Tickets/Edit', [
            'ticket' => $ticket,
            'options' => Ticket::options(),
        ]);
    }

    public function update(UpdateTicketRequest $request, Ticket $ticket): RedirectResponse
    {
        $ticket->update($request->validated());

        return redirect()->route('tickets.show', $ticket)->with('success', 'Ticket updated.');
    }

    public function destroy(Ticket $ticket): RedirectResponse
    {
        Gate::authorize('delete', $ticket);

        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted.');
    }
}
