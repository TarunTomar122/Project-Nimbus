# Spectrum Web Components Guide

## Table of Contents
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Basic Setup](#basic-setup)
- [Theme Configuration](#theme-configuration)
- [Available Components](#available-components)
- [Component Usage Examples](#component-usage-examples)

## Getting Started

Spectrum Web Components is a collection of web components that implement Adobe's Spectrum design system. These components can be used in any HTML project to create beautiful, consistent user interfaces.

## Installation

There are multiple ways to include Spectrum Web Components in your project:

### 1. Using JSPM (Recommended for quick start)
```html
<script src="https://jspm.dev/@spectrum-web-components/bundle/elements.js" type="module" async></script>
```

### 2. Using NPM
```bash
npm install @spectrum-web-components/bundle
```

Then import in your JavaScript:
```javascript
import '@spectrum-web-components/bundle/elements.js';
```

## Basic Setup

Here's a basic HTML template to get started:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Spectrum Web Components Demo</title>
    <script src="https://jspm.dev/@spectrum-web-components/bundle/elements.js" type="module" async></script>
</head>
<body>
    <sp-theme scale="medium" color="light" system="spectrum-two">
        <!-- Your content goes here -->
    </sp-theme>
</body>
</html>
```

## Theme Configuration

The `<sp-theme>` component is required to properly style your components. It accepts the following attributes:

- `scale`: Size scale of components
  - Values: "medium" (default), "large"
- `color`: Color theme
  - Values: "light" (default), "dark"
- `system`: Design system version
  - Values: "spectrum-two" (recommended), "spectrum"

## Available Components

Here's a list of available components you can use:

### Buttons and Actions
- `<sp-button>` - Standard button
- `<sp-action-button>` - Icon-based action button
- `<sp-action-group>` - Group of related actions
- `<sp-action-menu>` - Menu-based action button

### Form Elements
- `<sp-textfield>` - Text input field
- `<sp-checkbox>` - Checkbox input
- `<sp-radio>` - Radio button input
- `<sp-switch>` - Toggle switch
- `<sp-slider>` - Range slider
- `<sp-number-field>` - Numeric input field
- `<sp-combobox>` - Combo box input
- `<sp-search>` - Search input field

### Navigation
- `<sp-tabs>` - Tabbed navigation
- `<sp-sidenav>` - Side navigation
- `<sp-breadcrumbs>` - Breadcrumb navigation
- `<sp-top-nav>` - Top navigation bar

### Feedback and Status
- `<sp-progress-bar>` - Progress indicator
- `<sp-progress-circle>` - Circular progress indicator
- `<sp-status-light>` - Status indicator
- `<sp-toast>` - Toast notification
- `<sp-alert-dialog>` - Alert dialog
- `<sp-alert-banner>` - Alert banner

### Layout and Structure
- `<sp-dialog>` - Modal dialog
- `<sp-divider>` - Content divider
- `<sp-tray>` - Slide-out tray
- `<sp-overlay>` - Overlay container

### Data Display
- `<sp-table>` - Data table
- `<sp-tags>` - Tag display
- `<sp-thumbnail>` - Image thumbnail
- `<sp-meter>` - Meter display

## Component Usage Examples

### Button Variants
```html
<!-- Primary Button -->
<sp-button variant="accent">Primary Action</sp-button>

<!-- Secondary Button -->
<sp-button variant="secondary" quiet>Secondary Action</sp-button>

<!-- Icon Button -->
<sp-button variant="primary" icon-only label="Settings">
    <sp-icon-settings slot="icon"></sp-icon-settings>
</sp-button>

<!-- Button with Icon -->
<sp-button variant="primary">
    <sp-icon-edit slot="icon"></sp-icon-edit>
    Edit Document
</sp-button>

<!-- Negative Button -->
<sp-button variant="negative">Delete</sp-button>

<!-- Disabled Button -->
<sp-button variant="primary" disabled>Disabled</sp-button>
```

### Text Input Variants
```html
<sp-field-group vertical>
    <!-- Basic Input -->
    <sp-field-label for="name" required>Name</sp-field-label>
    <sp-textfield 
        id="name"
        placeholder="Enter your name"
        required></sp-textfield>

    <!-- Email Input -->
    <sp-field-label for="email">Email</sp-field-label>
    <sp-textfield 
        id="email"
        type="email"
        placeholder="Enter your email"
        valid></sp-textfield>

    <!-- Multiline Input -->
    <sp-field-label for="description">Description</sp-field-label>
    <sp-textfield 
        id="description"
        multiline
        grows
        placeholder="Enter description"></sp-textfield>

    <!-- Read-only Input -->
    <sp-field-label for="readonly">Read Only</sp-field-label>
    <sp-textfield 
        id="readonly"
        value="Cannot edit this"
        readonly></sp-textfield>

    <!-- Invalid Input -->
    <sp-field-label for="invalid">Invalid Input</sp-field-label>
    <sp-textfield 
        id="invalid"
        value="Invalid value"
        invalid
        help-text="Please correct this field"></sp-textfield>
</sp-field-group>
```

### Form Controls
```html
<sp-field-group vertical>
    <!-- Checkbox Group -->
    <sp-field-label>Preferences</sp-field-label>
    <sp-checkbox>Email notifications</sp-checkbox>
    <sp-checkbox checked>SMS notifications</sp-checkbox>
    <sp-checkbox indeterminate>Push notifications</sp-checkbox>
    <sp-checkbox disabled>Desktop notifications</sp-checkbox>

    <!-- Radio Group -->
    <sp-field-label>Theme</sp-field-label>
    <sp-radio-group name="theme" horizontal>
        <sp-radio value="light" checked>Light</sp-radio>
        <sp-radio value="dark">Dark</sp-radio>
        <sp-radio value="auto">Auto</sp-radio>
    </sp-radio-group>

    <!-- Switch -->
    <sp-switch>Enable feature</sp-switch>
    <sp-switch checked emphasized>Advanced mode</sp-switch>

    <!-- Number Field -->
    <sp-field-label for="quantity">Quantity</sp-field-label>
    <sp-number-field 
        id="quantity"
        value="1"
        min="0"
        max="100"
        step="1"></sp-number-field>
</sp-field-group>
```

### Navigation Components
```html
<!-- Tabs -->
<sp-tabs selected="tab1" quiet>
    <sp-tab value="tab1">Overview</sp-tab>
    <sp-tab value="tab2">Details</sp-tab>
    <sp-tab value="tab3" disabled>Disabled</sp-tab>
    
    <sp-tab-panel value="tab1">
        <h3>Overview Content</h3>
        <p>This is the overview section.</p>
    </sp-tab-panel>
    <sp-tab-panel value="tab2">
        <h3>Details Content</h3>
        <p>This is the details section.</p>
    </sp-tab-panel>
    <sp-tab-panel value="tab3">
        <p>Disabled content</p>
    </sp-tab-panel>
</sp-tabs>

<!-- Breadcrumbs -->
<sp-breadcrumbs>
    <sp-breadcrumb href="/">Home</sp-breadcrumb>
    <sp-breadcrumb href="/products">Products</sp-breadcrumb>
    <sp-breadcrumb selected>Current Item</sp-breadcrumb>
</sp-breadcrumbs>

<!-- Top Navigation -->
<sp-top-nav>
    <sp-action-group>
        <sp-action-button quiet>
            <sp-icon-home slot="icon"></sp-icon-home>
            Home
        </sp-action-button>
        <sp-action-button quiet selected>
            <sp-icon-document slot="icon"></sp-icon-document>
            Documents
        </sp-action-button>
        <sp-action-button quiet>
            <sp-icon-settings slot="icon"></sp-icon-settings>
            Settings
        </sp-action-button>
    </sp-action-group>
</sp-top-nav>
```

### Status and Progress
```html
<!-- Progress Bar -->
<sp-field-group vertical>
    <sp-progress-bar 
        value="30" 
        min="0" 
        max="100"
        label="Loading..."></sp-progress-bar>

    <sp-progress-bar 
        indeterminate
        label="Processing..."></sp-progress-bar>

    <sp-progress-bar 
        value="75"
        side-label
        label="Uploading..."></sp-progress-bar>
</sp-field-group>

<!-- Progress Circle -->
<sp-progress-circle 
    value="65"
    label="Loading..."
    size="m"></sp-progress-circle>

<!-- Status Light -->
<sp-status-light variant="positive">Online</sp-status-light>
<sp-status-light variant="negative">Offline</sp-status-light>
<sp-status-light variant="notice">Away</sp-status-light>

<!-- Badges -->
<sp-badge variant="info">New</sp-badge>
<sp-badge variant="positive">Success</sp-badge>
<sp-badge variant="negative">Error</sp-badge>
<sp-badge variant="neutral">Neutral</sp-badge>
```

### Notifications and Alerts
```html
<!-- Toast Notifications -->
<sp-toast variant="info" open timeout="3000">
    <sp-icon-info slot="icon"></sp-icon-info>
    Information message
</sp-toast>

<sp-toast variant="positive" open>
    <sp-icon-checkmark slot="icon"></sp-icon-icon>
    Success message
</sp-toast>

<sp-toast variant="negative" open countdown>
    <sp-icon-alert slot="icon"></sp-icon-alert>
    Error message
</sp-toast>

<!-- Alert Banner -->
<sp-alert-banner variant="info" header="Information">
    This is an informational message.
    <sp-button slot="action" quiet>Learn More</sp-button>
</sp-alert-banner>

<!-- Alert Dialog -->
<sp-alert-dialog variant="warning" dismissable>
    <h2 slot="heading">Warning</h2>
    <div slot="content">
        Are you sure you want to proceed?
    </div>
    <sp-button-group slot="button-group">
        <sp-button variant="secondary" quiet>Cancel</sp-button>
        <sp-button variant="primary">Proceed</sp-button>
    </sp-button-group>
</sp-alert-dialog>
```

### Data Display
```html
<!-- Table -->
<sp-table sortable selectable>
    <sp-table-head>
        <sp-table-head-cell sortable>Name</sp-table-head-cell>
        <sp-table-head-cell sortable>Status</sp-table-head-cell>
        <sp-table-head-cell>Actions</sp-table-head-cell>
    </sp-table-head>
    <sp-table-body>
        <sp-table-row>
            <sp-table-cell>Document 1</sp-table-cell>
            <sp-table-cell>
                <sp-status-light variant="positive">Active</sp-status-light>
            </sp-table-cell>
            <sp-table-cell>
                <sp-action-button quiet>
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
            </sp-table-cell>
        </sp-table-row>
        <sp-table-row>
            <sp-table-cell>Document 2</sp-table-cell>
            <sp-table-cell>
                <sp-status-light variant="negative">Inactive</sp-status-light>
            </sp-table-cell>
            <sp-table-cell>
                <sp-action-button quiet>
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                </sp-action-button>
            </sp-table-cell>
        </sp-table-row>
    </sp-table-body>
</sp-table>

<!-- Tags -->
<sp-tags>
    <sp-tag>Tag 1</sp-tag>
    <sp-tag deletable>Tag 2</sp-tag>
    <sp-tag invalid>Invalid Tag</sp-tag>
    <sp-tag disabled>Disabled Tag</sp-tag>
</sp-tags>


### Color Components
```html
<sp-field-group vertical>
    <!-- Color Area -->
    <sp-color-area 
        value="#FF5500"
        label="Select color"></sp-color-area>

    <!-- Color Slider -->
    <sp-color-slider
        channel="hue"
        value="#FF5500"></sp-color-slider>

    <!-- Color Wheel -->
    <sp-color-wheel
        value="#FF5500"></sp-color-wheel>

    <!-- Color Field -->
    <sp-color-field
        value="#FF5500"
        label="Color value"></sp-color-field>
</sp-field-group>
```

### Avatar and Icons
```html
<!-- Avatars -->
<sp-avatar 
    label="User Name"
    src="avatar.jpg"
    size="m"></sp-avatar>

<sp-avatar 
    label="No Image"
    size="m"></sp-avatar>

<!-- Icons -->
<sp-icon-group>
    <sp-icon name="ui:Magnifier" size="s" label="Search"></sp-icon>
    <sp-icon name="ui:Edit" size="m" label="Edit"></sp-icon>
    <sp-icon name="ui:Delete" size="l" label="Delete"></sp-icon>
</sp-icon-group>
```

### Links and Dividers
```html
<!-- Links -->
<sp-link href="#">Default Link</sp-link>
<sp-link href="#" quiet>Quiet Link</sp-link>
<sp-link href="#" disabled>Disabled Link</sp-link>

<!-- Dividers -->
<sp-divider size="s"></sp-divider>
<div>Content between dividers</div>
<sp-divider size="m"></sp-divider>
```

## Complex Component Examples

### Dialog with Overlay
```html
<sp-overlay>
    <sp-dialog 
        size="m" 
        dismissable 
        underlay
        id="myDialog">
        <div slot="heading">
            <h2>Dialog Title</h2>
            <sp-divider size="m"></sp-divider>
        </div>
        <div slot="content">
            <sp-field-group vertical>
                <sp-field-label for="name" required>Name</sp-field-label>
                <sp-textfield 
                    id="name" 
                    placeholder="Enter your name"
                    required></sp-textfield>
                
                <sp-field-label for="email">Email</sp-field-label>
                <sp-textfield 
                    id="email" 
                    placeholder="Enter your email"
                    type="email"></sp-textfield>
            </sp-field-group>
        </div>
        <div slot="button-group">
            <sp-button 
                variant="secondary" 
                quiet
                onclick="document.querySelector('#myDialog').open = false">
                Cancel
            </sp-button>
            <sp-button 
                variant="accent"
                onclick="document.querySelector('#myDialog').open = false">
                Save
            </sp-button>
        </div>
    </sp-dialog>
</sp-overlay>

<sp-button 
    variant="accent"
    onclick="document.querySelector('#myDialog').open = true">
    Open Dialog
</sp-button>
```

### Popover Menu with Overlay
```html
<sp-overlay trigger="popoverTrigger" placement="bottom">
    <sp-popover tip id="popoverMenu">
        <sp-dialog>
            <sp-menu selects="single">
                <sp-menu-item value="edit">
                    <sp-icon-edit slot="icon"></sp-icon-edit>
                    Edit
                </sp-menu-item>
                <sp-menu-item value="duplicate">
                    <sp-icon-copy slot="icon"></sp-icon-copy>
                    Duplicate
                </sp-menu-item>
                <sp-menu-divider></sp-menu-divider>
                <sp-menu-item value="delete">
                    <sp-icon-delete slot="icon"></sp-icon-delete>
                    <sp-text style="color: var(--spectrum-negative-color-900)">
                        Delete
                    </sp-text>
                </sp-menu-item>
            </sp-menu>
        </sp-dialog>
    </sp-popover>
</sp-overlay>

<sp-action-button 
    id="popoverTrigger"
    quiet>
    <sp-icon-more slot="icon"></sp-icon-more>
</sp-action-button>
```

### Action Menu with Custom Styling
```html
<sp-action-menu 
    label="More Actions" 
    placement="bottom"
    quiet>
    <sp-menu-group>
        <sp-menu-item value="edit">
            <sp-icon-edit slot="icon"></sp-icon-edit>
            Edit
        </sp-menu-item>
        <sp-menu-item value="share">
            <sp-icon-share slot="icon"></sp-icon-share>
            Share
        </sp-menu-item>
    </sp-menu-group>
    <sp-menu-divider></sp-menu-divider>
    <sp-menu-item value="delete">
        <sp-icon-delete slot="icon"></sp-icon-delete>
        <sp-text style="color: var(--spectrum-negative-color-900)">
            Delete
        </sp-text>
    </sp-menu-item>
</sp-action-menu>
```

### Modal Form with Validation
```html
<sp-overlay>
    <sp-dialog 
        id="modalForm"
        size="l" 
        dismissable 
        underlay>
        <div slot="heading">
            <h2>Create New Item</h2>
            <sp-divider size="m"></sp-divider>
        </div>
        
        <div slot="content">
            <sp-field-group vertical>
                <sp-field-label for="title" required>Title</sp-field-label>
                <sp-textfield 
                    id="title" 
                    placeholder="Enter title"
                    required
                    valid></sp-textfield>

                <sp-field-label for="category">Category</sp-field-label>
                <sp-picker 
                    id="category" 
                    label="Select category"
                    quiet>
                    <sp-menu-item value="1">Category 1</sp-menu-item>
                    <sp-menu-item value="2">Category 2</sp-menu-item>
                    <sp-menu-item value="3">Category 3</sp-menu-item>
                </sp-picker>

                <sp-field-label for="description">Description</sp-field-label>
                <sp-textfield 
                    id="description" 
                    placeholder="Enter description" 
                    multiline 
                    grows
                    quiet></sp-textfield>

                <sp-field-label for="status">Status</sp-field-label>
                <sp-radio-group 
                    name="status" 
                    id="status"
                    horizontal>
                    <sp-radio value="active" checked>Active</sp-radio>
                    <sp-radio value="draft">Draft</sp-radio>
                </sp-radio-group>
            </sp-field-group>
        </div>

        <div slot="button-group">
            <sp-button 
                variant="secondary"
                quiet
                onclick="document.querySelector('#modalForm').open = false">
                Cancel
            </sp-button>
            <sp-button 
                variant="accent"
                onclick="document.querySelector('#modalForm').open = false">
                Create
            </sp-button>
        </div>
    </sp-dialog>
</sp-overlay>

<sp-button 
    variant="accent"
    onclick="document.querySelector('#modalForm').open = true">
    Open Form
</sp-button>
```

### Tray with Navigation and Icons
```html
<sp-overlay>
    <sp-tray 
        id="sideNav"
        placement="right" 
        dismissable>
        <sp-dialog>
            <div slot="heading">
                <h2>Navigation</h2>
                <sp-divider size="m"></sp-divider>
            </div>
            <div slot="content">
                <sp-sidenav>
                    <sp-sidenav-item selected>
                        <sp-icon-home slot="icon"></sp-icon-home>
                        Home
                    </sp-sidenav-item>
                    <sp-sidenav-item>
                        <sp-icon-user slot="icon"></sp-icon-user>
                        Profile
                    </sp-sidenav-item>
                    <sp-sidenav-item>
                        <sp-icon-settings slot="icon"></sp-icon-settings>
                        Settings
                    </sp-sidenav-item>
                </sp-sidenav>
            </div>
        </sp-dialog>
    </sp-tray>
</sp-overlay>

<sp-button 
    variant="primary"
    quiet
    onclick="document.querySelector('#sideNav').open = true">
    <sp-icon-menu slot="icon"></sp-icon-menu>
    Open Menu
</sp-button>
```
<sp-split-view 
    primary-size="25%" 
    splitter-pos="300"
    collapsible>
    <div slot="primary">
        <sp-sidenav>
            <sp-sidenav-item selected>
                <sp-icon-folder slot="icon"></sp-icon-folder>
                Projects
            </sp-sidenav-item>
            <sp-sidenav-item>
                <sp-icon-file slot="icon"></sp-icon-file>
                Documents
            </sp-sidenav-item>
            <sp-sidenav-item>
                <sp-icon-image slot="icon"></sp-icon-image>
                Images
            </sp-sidenav-item>
        </sp-sidenav>
    </div>
</sp-split-view>
```

### Contextual Help with Tabs
```html
<sp-overlay>
    <sp-contextual-help 
        id="helpOverlay"
        heading="Need Help?">
        <sp-tabs selected="overview" quiet>
            <sp-tab value="overview">Overview</sp-tab>
            <sp-tab value="features">Features</sp-tab>
            <sp-tab value="faq">FAQ</sp-tab>
            
            <sp-tab-panel value="overview">
                <sp-field-group vertical>
                    <h3>Getting Started</h3>
                    <p>Quick introduction to the main features.</p>
                    <sp-link href="#" quiet>View Documentation</sp-link>
                </sp-field-group>
            </sp-tab-panel>
            
            <sp-tab-panel value="features">
                <sp-field-group vertical>
                    <h3>Key Features</h3>
                    <ul>
                        <li>Feature 1: Description</li>
                        <li>Feature 2: Description</li>
                        <li>Feature 3: Description</li>
                    </ul>
                </sp-field-group>
            </sp-tab-panel>

            <sp-tab-panel value="faq">
                <sp-field-group vertical>
                    <h3>Common Questions</h3>
                    <sp-accordion>
                        <sp-accordion-item>
                            <span slot="header">Question 1?</span>
                            <div>Answer to question 1</div>
                        </sp-accordion-item>
                        <sp-accordion-item>
                            <span slot="header">Question 2?</span>
                            <div>Answer to question 2</div>
                        </sp-accordion-item>
                    </sp-accordion>
                </sp-field-group>
            </sp-tab-panel>
        </sp-tabs>
    </sp-contextual-help>
</sp-overlay>

<sp-button 
    variant="primary"
    quiet
    onclick="document.querySelector('#helpOverlay').open = true">
    <sp-icon-help slot="icon"></sp-icon-help>
    Help
</sp-button>
```

For more detailed documentation and examples for each component, visit the [official Spectrum Web Components documentation](https://opensource.adobe.com/spectrum-web-components/).

## Component Attributes and Events

### Button Components

#### `<sp-button>`
**Attributes:**
- `variant`: Type of button
  - Values: `"accent"` (default), `"primary"`, `"secondary"`, `"negative"`, `"white"`, `"black"`
- `size`: Button size
  - Values: `"s"`, `"m"` (default), `"l"`, `"xl"`
- `treatment`: Button style
  - Values: `"fill"` (default), `"outline"`
- `disabled`: Disables the button
  - Values: `true`, `false`
- `icon-only`: Shows only the icon
  - Values: `true`, `false`
- `label`: Accessible label (required for icon-only buttons)
  - Type: `string`

**Events:**
- `click`: Fired when button is clicked
- `focus`: Fired when button receives focus
- `blur`: Fired when button loses focus

#### `<sp-action-button>`
**Attributes:**
- Inherits all `<sp-button>` attributes
- `quiet`: Renders a quiet variant
  - Values: `true`, `false`
- `hold-affordance`: Shows hold icon
  - Values: `true`, `false`

### Form Components

#### `<sp-textfield>`
**Attributes:**
- `placeholder`: Placeholder text
  - Type: `string`
- `value`: Input value
  - Type: `string`
- `disabled`: Disables the input
  - Values: `true`, `false`
- `readonly`: Makes input read-only
  - Values: `true`, `false`
- `required`: Makes input required
  - Values: `true`, `false`
- `valid`: Validation state
  - Values: `true`, `false`
- `quiet`: Renders quiet variant
  - Values: `true`, `false`

**Events:**
- `input`: Fired when value changes
- `change`: Fired when value is committed
- `focus`: Fired when field receives focus
- `blur`: Fired when field loses focus

#### `<sp-checkbox>`
**Attributes:**
- `checked`: Checkbox state
  - Values: `true`, `false`
- `indeterminate`: Indeterminate state
  - Values: `true`, `false`
- `disabled`: Disables the checkbox
  - Values: `true`, `false`
- `invalid`: Shows error state
  - Values: `true`, `false`

**Events:**
- `change`: Fired when checked state changes
- `input`: Fired when value changes

### Navigation Components

#### `<sp-tabs>`
**Attributes:**
- `selected`: Selected tab value
  - Type: `string`
- `direction`: Tab layout direction
  - Values: `"horizontal"` (default), `"vertical"`
- `compact`: Renders compact variant
  - Values: `true`, `false`
- `quiet`: Renders quiet variant
  - Values: `true`, `false`

**Events:**
- `change`: Fired when selected tab changes

#### `<sp-tab>`
**Attributes:**
- `value`: Tab identifier
  - Type: `string`
- `disabled`: Disables the tab
  - Values: `true`, `false`
- `selected`: Whether tab is selected
  - Values: `true`, `false`

### Feedback Components

#### `<sp-progress-bar>`
**Attributes:**
- `value`: Current progress value
  - Type: `number`
- `min`: Minimum value
  - Type: `number`
- `max`: Maximum value
  - Type: `number`
- `label`: Accessible label
  - Type: `string`
- `indeterminate`: Shows indeterminate state
  - Values: `true`, `false`
- `side-label`: Shows label to the side
  - Values: `true`, `false`

#### `<sp-toast>`
**Attributes:**
- `variant`: Toast type
  - Values: `"info"`, `"positive"`, `"negative"`, `"warning"`
- `open`: Shows the toast
  - Values: `true`, `false`
- `timeout`: Auto-close duration (ms)
  - Type: `number`
- `countdown`: Shows countdown timer
  - Values: `true`, `false`

**Events:**
- `close`: Fired when toast is closed
- `open`: Fired when toast is opened

### Layout Components

#### `<sp-dialog>`
**Attributes:**
- `open`: Shows the dialog
  - Values: `true`, `false`
- `dismissable`: Can be dismissed
  - Values: `true`, `false`
- `underlay`: Shows underlay
  - Values: `true`, `false`
- `no-divider`: Removes divider
  - Values: `true`, `false`

**Events:**
- `close`: Fired when dialog is closed
- `open`: Fired when dialog is opened

### Data Display Components

#### `<sp-table>`
**Attributes:**
- `size`: Table size
  - Values: `"s"`, `"m"`, `"l"`
- `quiet`: Renders quiet variant
  - Values: `true`, `false`
- `sortable`: Enables sorting
  - Values: `true`, `false`
- `selectable`: Enables row selection
  - Values: `true`, `false`

**Events:**
- `sort`: Fired when column sort changes
- `select`: Fired when row selection changes

#### `<sp-tags>`
**Attributes:**
- `size`: Tag size
  - Values: `"s"`, `"m"`, `"l"`
- `deletable`: Shows delete button
  - Values: `true`, `false`
- `invalid`: Shows error state
  - Values: `true`, `false`

**Events:**
- `delete`: Fired when tag is deleted

### Action Components

#### `<sp-action-group>`
**Attributes:**
- `vertical`: Vertical layout
  - Values: `true`, `false`
- `compact`: Compact spacing
  - Values: `true`, `false`
- `quiet`: Quiet variant
  - Values: `true`, `false`

#### `<sp-action-menu>`
**Attributes:**
- `label`: Accessible label
  - Type: `string`
- `open`: Menu state
  - Values: `true`, `false`
- `placement`: Menu placement
  - Values: `"top"`, `"bottom"`, `"left"`, `"right"`

**Events:**
- `change`: Fired when selection changes
- `open`: Fired when menu opens
- `close`: Fired when menu closes

### Alert Components

#### `<sp-alert-dialog>`
**Attributes:**
- `variant`: Alert type
  - Values: `"error"`, `"warning"`, `"info"`, `"success"`
- `dismissable`: Can be dismissed
  - Values: `true`, `false`
- `open`: Dialog state
  - Values: `true`, `false`

**Events:**
- `close`: Fired when dialog closes
- `confirm`: Fired when primary action clicked

#### `<sp-alert-banner>`
**Attributes:**
- `variant`: Alert type
  - Values: `"error"`, `"warning"`, `"info"`, `"success"`
- `header`: Banner header text
  - Type: `string`
- `dismissable`: Can be dismissed
  - Values: `true`, `false`

**Events:**
- `close`: Fired when banner is dismissed

### Avatar Component

#### `<sp-avatar>`
**Attributes:**
- `size`: Avatar size
  - Values: `"s"`, `"m"`, `"l"`, `"xl"`
- `label`: Accessible label
  - Type: `string`
- `src`: Image source URL
  - Type: `string`
- `disabled`: Disabled state
  - Values: `true`, `false`

### Badge Component

#### `<sp-badge>`
**Attributes:**
- `variant`: Badge type
  - Values: `"info"`, `"positive"`, `"negative"`, `"neutral"`
- `size`: Badge size
  - Values: `"s"`, `"m"`, `"l"`
- `quiet`: Quiet variant
  - Values: `true`, `false`

### Breadcrumbs Component

#### `<sp-breadcrumbs>`
**Attributes:**
- `size`: Breadcrumb size
  - Values: `"s"`, `"m"`, `"l"`
- `variant`: Display variant
  - Values: `"default"`, `"multiline"`

#### `<sp-breadcrumb>`
**Attributes:**
- `href`: Link destination
  - Type: `string`
- `selected`: Selected state
  - Values: `true`, `false`

### Color Components

#### `<sp-color-area>`
**Attributes:**
- `disabled`: Disabled state
  - Values: `true`, `false`
- `value`: Color value
  - Type: `string`

**Events:**
- `input`: Fired when color changes
- `change`: Fired when color is committed

#### `<sp-color-slider>`
**Attributes:**
- `disabled`: Disabled state
  - Values: `true`, `false`
- `value`: Color value
  - Type: `string`
- `channel`: Color channel
  - Values: `"hue"`, `"saturation"`, `"value"`, `"alpha"`

**Events:**
- `input`: Fired when value changes
- `change`: Fired when value is committed

#### `<sp-color-wheel>`
**Attributes:**
- `disabled`: Disabled state
  - Values: `true`, `false`
- `value`: Color value
  - Type: `string`

**Events:**
- `input`: Fired when color changes
- `change`: Fired when color is committed

### Field Components

#### `<sp-field-group>`
**Attributes:**
- `horizontal`: Horizontal layout
  - Values: `true`, `false`
- `help-text`: Help text content
  - Type: `string`
- `label`: Group label
  - Type: `string`

#### `<sp-field-label>`
**Attributes:**
- `size`: Label size
  - Values: `"s"`, `"m"`, `"l"`, `"xl"`
- `required`: Shows required indicator
  - Values: `true`, `false`
- `for`: Associated input ID
  - Type: `string`

### Icon Components

#### `<sp-icon>`
**Attributes:**
- `size`: Icon size
  - Values: `"xxs"`, `"xs"`, `"s"`, `"m"`, `"l"`, `"xl"`, `"xxl"`
- `name`: Icon name
  - Type: `string`
- `label`: Accessible label
  - Type: `string`

### Link Component

#### `<sp-link>`
**Attributes:**
- `href`: Link destination
  - Type: `string`
- `quiet`: Quiet variant
  - Values: `true`, `false`
- `disabled`: Disabled state
  - Values: `true`, `false`

### Menu Components

#### `<sp-menu>`
**Attributes:**
- `selects`: Selection mode
  - Values: `"single"`, `"multiple"`, `"none"`
- `value`: Selected value(s)
  - Type: `string | string[]`

**Events:**
- `change`: Fired when selection changes

#### `<sp-menu-item>`
**Attributes:**
- `value`: Item value
  - Type: `string`
- `selected`: Selected state
  - Values: `true`, `false`
- `disabled`: Disabled state
  - Values: `true`, `false`

### Number Field Component

#### `<sp-number-field>`
**Attributes:**
- `value`: Current value
  - Type: `number`
- `min`: Minimum value
  - Type: `number`
- `max`: Maximum value
  - Type: `number`
- `step`: Step increment
  - Type: `number`
- `disabled`: Disabled state
  - Values: `true`, `false`
- `readonly`: Read-only state
  - Values: `true`, `false`

**Events:**
- `input`: Fired when value changes
- `change`: Fired when value is committed

### Radio Component

#### `<sp-radio>`
**Attributes:**
- `checked`: Checked state
  - Values: `true`, `false`
- `value`: Radio value
  - Type: `string`
- `disabled`: Disabled state
  - Values: `true`, `false`
- `invalid`: Error state
  - Values: `true`, `false`

**Events:**
- `change`: Fired when checked state changes

#### `<sp-radio-group>`
**Attributes:**
- `value`: Selected value
  - Type: `string`
- `name`: Group name
  - Type: `string`
- `horizontal`: Horizontal layout
  - Values: `true`, `false`

**Events:**
- `change`: Fired when selection changes

### Search Component

#### `<sp-search>`
**Attributes:**
- `value`: Search text
  - Type: `string`
- `placeholder`: Placeholder text
  - Type: `string`
- `quiet`: Quiet variant
  - Values: `true`, `false`
- `disabled`: Disabled state
  - Values: `true`, `false`

**Events:**
- `input`: Fired when value changes
- `search`: Fired when search is triggered

### Sidenav Component

#### `<sp-sidenav>`
**Attributes:**
- `variant`: Navigation style
  - Values: `"default"`, `"multilevel"`
- `selected`: Selected item value
  - Type: `string`
- `expanded`: Expanded state
  - Values: `true`, `false`

**Events:**
- `change`: Fired when selection changes

### Split View Component

#### `<sp-split-view>`
**Attributes:**
- `primary-size`: Primary pane size
  - Type: `string`
- `splitter-pos`: Splitter position
  - Type: `number`
- `vertical`: Vertical layout
  - Values: `true`, `false`
- `collapsible`: Can be collapsed
  - Values: `true`, `false`

**Events:**
- `resize`: Fired when pane is resized

### Switch Component

#### `<sp-switch>`
**Attributes:**
- `checked`: Switch state
  - Values: `true`, `false`
- `disabled`: Disabled state
  - Values: `true`, `false`
- `emphasized`: Emphasized style
  - Values: `true`, `false`

**Events:**
- `change`: Fired when state changes

### Top Nav Component

#### `<sp-top-nav>`
**Attributes:**
- `size`: Navigation size
  - Values: `"s"`, `"m"`, `"l"`
- `collapsed`: Collapsed state
  - Values: `true`, `false`

### Tray Component

#### `<sp-tray>`
**Attributes:**
- `open`: Tray state
  - Values: `true`, `false`
- `placement`: Tray placement
  - Values: `"left"`, `"right"`, `"top"`, `"bottom"`
- `dismissable`: Can be dismissed
  - Values: `true`, `false`

**Events:**
- `open`: Fired when tray opens
- `close`: Fired when tray closes

## Best Practices

1. Always wrap your components in an `<sp-theme>` element
2. Use appropriate variants and sizes based on your use case
3. Follow accessibility guidelines by providing proper labels and ARIA attributes
4. Consider mobile responsiveness when laying out components
5. Use color variants consistently throughout your application

## Browser Support

Spectrum Web Components supports all modern browsers that implement the Web Components standards:
- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

Common issues and solutions:

1. Components not rendering:
   - Ensure you've included the correct script/import
   - Check if your browser supports Web Components
   - Verify the `<sp-theme>` wrapper is present

2. Styling issues:
   - Make sure components are within an `<sp-theme>` element
   - Check if the correct scale and color theme are set
   - Verify custom CSS is not conflicting with component styles

3. Performance:
   - Use async loading for the script tag
   - Consider lazy loading components that aren't immediately needed
   - Import only the components you need if using npm 