<?php

namespace Database\Seeders;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Demo account for the checking (safe to run many times).
        $demo = User::firstOrCreate(
            ['email' => 'demo@helpdesk.test'],
            ['name' => 'Demo User', 'password' => Hash::make(env('DEMO_PASSWORD') ?: 'password')]
        );

        // Second account, handy for proving the 403 ownership check.
        User::firstOrCreate(
            ['email' => 'other@helpdesk.test'],
            ['name' => 'Other User', 'password' => Hash::make(env('DEMO_PASSWORD') ?: 'password')]
        );

        if (Ticket::where('user_id', $demo->id)->exists()) {
            return;
        }

        $samples = [
            ['Printer on 2nd floor is jammed', 'Paper keeps jamming in tray 2 and prints come out streaky.', 'Medium', 'Open', 'Hardware'],
            ['Cannot connect to office Wi-Fi', 'Laptop shows limited connectivity since this morning.', 'High', 'In Progress', 'Network'],
            ['Install Visual Studio Code', 'Need VS Code installed on the new workstation.', 'Low', 'Resolved', 'Software'],
            ['Password reset for payroll system', 'Locked out after three failed login attempts.', 'Urgent', 'Open', 'Account'],
            ['Monitor flickering randomly', 'Left monitor flickers every few minutes at desk 14.', 'Medium', 'Open', 'Hardware'],
            ['VPN drops every 10 minutes', 'VPN disconnects and has to be re-authenticated often.', 'High', 'In Progress', 'Network'],
            ['Request access to shared drive', 'Need read/write access to the Finance shared drive.', 'Low', 'Closed', 'Account'],
            ['Antivirus license expired', 'Antivirus warns the license ended last week.', 'High', 'Open', 'Software'],
            ['Keyboard keys not responding', 'The E and R keys stopped working on my keyboard.', 'Low', 'Resolved', 'Hardware'],
            ['Email attachments will not open', 'PDF attachments show an error when I double-click.', 'Medium', 'In Progress', 'Software'],
            ['Projector not detected in meeting room', 'HDMI projector is not detected from any laptop.', 'Medium', 'Open', 'Hardware'],
            ['Other: request for a new desk phone', 'Our team needs one more desk phone for the new hire.', 'Low', 'Open', 'Other'],
        ];

        foreach ($samples as [$title, $description, $priority, $status, $category]) {
            $ticket = new Ticket(compact('title', 'description', 'priority', 'status', 'category'));
            $ticket->user_id = $demo->id;
            $ticket->save();
        }
    }
}
