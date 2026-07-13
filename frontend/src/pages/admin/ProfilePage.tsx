import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'
import { updateProfile } from '../../lib/api'
import { resizeImageToDataUrl } from '../../lib/image'
import Button from '../../components/ui/Button'

const GENDER_OPTIONS = ['Prefer not to say', 'Female', 'Male', 'Non-binary', 'Other']

function Avatar({ url, name }: { url?: string | null; name: string }) {
  if (url) {
    return <img src={url} alt={name} className="w-20 h-20 rounded-full object-cover border border-gray-200" />
  }
  const initials = name.split(' ').map((p) => p[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
  return (
    <div className="w-20 h-20 rounded-full bg-navy text-white flex items-center justify-center font-bold text-2xl border border-gray-200">
      {initials || '?'}
    </div>
  )
}

export default function ProfilePage() {
  const { user, refreshUser } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [firstName, setFirstName] = useState(user?.firstName ?? '')
  const [lastName, setLastName] = useState(user?.lastName ?? '')
  const [gender, setGender] = useState(user?.gender ?? '')
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl ?? '')
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const displayName = [firstName, lastName].filter(Boolean).join(' ') || user?.email || ''

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) return toast.error('Please choose an image file')

    setUploading(true)
    try {
      const dataUrl = await resizeImageToDataUrl(file)
      setAvatarUrl(dataUrl)
    } catch {
      toast.error('Could not process that image')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateProfile({
        ...(firstName.trim() && { firstName: firstName.trim() }),
        ...(lastName.trim() && { lastName: lastName.trim() }),
        ...(gender && { gender }),
        ...(avatarUrl && { avatarUrl }),
      })
      await refreshUser()
      toast.success('Profile updated')
    } catch {
      toast.error('Could not save your profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-navy">Your Profile</h1>
        <p className="text-gray-500 text-sm mt-1">{user?.email}</p>
      </div>

      <div className="flex items-center gap-5 mb-8">
        <Avatar url={avatarUrl} name={displayName} />
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="text-sm font-semibold text-brand-blue hover:underline disabled:opacity-60"
          >
            {uploading ? 'Processing...' : 'Upload photo'}
          </button>
          {avatarUrl && (
            <button
              type="button"
              onClick={() => setAvatarUrl('')}
              className="block text-xs text-gray-400 hover:text-red-500 mt-1 transition-colors"
            >
              Remove photo
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">First name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-navy focus:outline-none focus:border-navy transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Last name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-navy focus:outline-none focus:border-navy transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender <span className="text-gray-400 font-normal">(optional)</span></label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-navy focus:outline-none focus:border-navy transition-colors bg-white"
          >
            <option value="">Select...</option>
            {GENDER_OPTIONS.map((g) => (<option key={g} value={g}>{g}</option>))}
          </select>
        </div>

        <Button type="button" onClick={handleSave} disabled={saving} fullWidth className="mt-2">
          {saving ? 'Saving...' : 'Save changes'}
        </Button>
      </div>
    </div>
  )
}
