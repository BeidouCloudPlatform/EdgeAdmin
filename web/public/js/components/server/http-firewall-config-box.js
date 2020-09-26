Vue.component("http-firewall-config-box", {
	props: ["v-firewall-config", "v-firewall-policies", "v-is-location"],
	data: function () {
		let firewall = this.vFirewallConfig
		if (firewall == null) {
			firewall = {
				isPrior: false,
				isOn: false,
				firewallPolicyId: 0
			}
		}

		return {
			firewall: firewall
		}
	},
	methods: {
		changePolicyId: function () {
			this.firewall.firewallPolicyId = parseInt(this.firewall.firewallPolicyId)
		}
	},
	template: `<div>
	<input type="hidden" name="firewallJSON" :value="JSON.stringify(firewall)"/>
	<table class="ui table selectable definition">
		<prior-checkbox :v-config="firewall" v-if="vIsLocation"></prior-checkbox>
		<tbody v-show="!vIsLocation || firewall.isPrior">
			<tr>
				<td class="title">是否启用Web防火墙</td>
				<td>
					<div class="ui checkbox">
						<input type="checkbox" v-model="firewall.isOn"/>
						<label></label>
					</div>
				</td>
			</tr>
		</tbody>
		<tbody v-show="(!vIsLocation || firewall.isPrior) && firewall.isOn">
			<tr>
				<td>选择Web防火墙策略</td>
				<td>
					<span class="disabled" v-if="vFirewallPolicies.length == 0">暂时还没有防火墙策略</span>
					<div v-if="vFirewallPolicies.length > 0">
						<select class="ui dropdown auto-width" v-model="firewall.firewallPolicyId" @change="changePolicyId">
							<option value="0">[请选择]</option>
							<option v-for="policy in vFirewallPolicies" :value="policy.id">{{policy.name}}</option>
						</select>
					</div>
				</td>
			</tr>
		</tbody>
	</table>
	<div class="margin"></div>
</div>`
})