import { useState } from "react";
import { Card, Form, TextInput, Toggle, Alert, Text } from "@prismal/react";

const SettingsSection = () => {
    const [saved, setSaved] = useState(false);

    return (
        <div className="admin-settings">
            <Card elevation={1} type="fieldset" legend={<Text type="heading" level={5}>Account settings</Text>}>
                {saved && (
                    <Alert message="Settings saved." closeAlert={() => setSaved(false)} />
                )}
                <Form
                    gridTemplate="1fr 1fr"
                    onSubmit={() => setSaved(true)}
                >
                    <TextInput name="displayName" label="Display name" value="Priya Nair" />
                    <TextInput name="email" label="Email" htmlType="email" value="priya.nair@example.com" />
                    <Toggle type="switch" name="emailNotifications" label="Email notifications" checked />
                    <Toggle type="switch" name="smsAlerts" label="SMS alerts" />
                    <Toggle type="switch" name="weeklyDigest" label="Weekly digest" checked />
                </Form>
            </Card>
        </div>
    );
};

export default SettingsSection;
