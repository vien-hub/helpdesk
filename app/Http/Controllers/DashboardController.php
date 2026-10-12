<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $mine = fn () => Ticket::where('user_id', $request->user()->id);

        return Inertia::render('Dashboard', [
            'stats' => [
                'total' => $mine()->count(),
                'open' => $mine()->where('status', 'Open')->count(),
                'in_progress' => $mine()->where('status', 'In Progress')->count(),
                'resolved' => $mine()->whereIn('status', ['Resolved', 'Closed'])->count(),
            ],
            'recent' => $mine()->latest()->limit(5)
                ->get(['id', 'title', 'priority', 'status', 'created_at']),
        ]);
    }
}
