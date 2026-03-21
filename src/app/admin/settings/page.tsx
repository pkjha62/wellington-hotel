import AdminShell from "@/components/admin/AdminShell";
import SettingsForm from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/store";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings" description="Edit hotel identity, hero content, contact details, and social links that appear across the public site.">
      <SettingsForm settings={getSettings()} />
    </AdminShell>
  );
}
